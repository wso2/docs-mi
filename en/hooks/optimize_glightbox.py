import json
from mkdocs import utils
from mkdocs_glightbox.plugin import LightboxPlugin


def on_config(config, **kwargs):
    plugins = config["plugins"]
    glightbox_plugin = next(
        (p for p in plugins.values() if isinstance(p, LightboxPlugin)), None
    )
    if glightbox_plugin is None:
        return

    # MkDocs caches bound method references in plugins.events at load time,
    # so patching the instance is too late — we replace the cached reference directly.
    post_page_events = plugins.events.get("post_page", [])
    for i, method in enumerate(post_page_events):
        if getattr(method, "__self__", None) is glightbox_plugin:
            post_page_events[i] = _make_fast_on_post_page(glightbox_plugin)
            break


def _make_fast_on_post_page(plugin):
    def fast_on_post_page(output, page, config, **kwargs):
        if "glightbox" in page.meta and page.meta.get("glightbox", True) is False:
            return output

        plugin_config = dict(plugin.config)
        lb_config = {k: plugin_config[k] for k in ["touchNavigation", "loop", "zoomable", "draggable"]}
        lb_config["openEffect"] = plugin_config.get("effect", "zoom")
        lb_config["closeEffect"] = plugin_config.get("effect", "zoom")
        lb_config["slideEffect"] = plugin_config.get("slide_effect", "slide")

        css_url = utils.get_relative_url(utils.normalize_url("assets/stylesheets/glightbox.min.css"), page.url)
        js_url = utils.get_relative_url(utils.normalize_url("assets/javascripts/glightbox.min.js"), page.url)

        is_material = config["theme"].name == "material"
        has_instant = "navigation.instant" in getattr(config["theme"], "_vars", {}).get("features", [])

        inline_css = (
            "html.glightbox-open { overflow: initial; height: 100%; } "
            ".gslide-title { margin-top: 0px; user-select: text; } "
            ".gslide-desc { color: #666; user-select: text; } "
            ".gslide-image img { background: white; }"
        )
        if is_material:
            inline_css += (
                " .gscrollbar-fixer { padding-right: 15px; }"
                " .gdesc-inner { font-size: 0.75rem; }"
                " body[data-md-color-scheme='slate'] .gdesc-inner { background: var(--md-default-bg-color);}"
                " body[data-md-color-scheme='slate'] .gslide-title { color: var(--md-default-fg-color);}"
                " body[data-md-color-scheme='slate'] .gslide-desc { color: var(--md-default-fg-color);}"
            )

        head_tags = (
            f'<link href="{css_url}" rel="stylesheet">'
            f'<style>{inline_css}</style>'
            f'<script src="{js_url}"></script>'
        )

        js_init = f"const lightbox = GLightbox({json.dumps(lb_config)});"
        if is_material or has_instant:
            js_init = f"document$.subscribe(() => {{{js_init}}})"
        body_tag = f"<script>{js_init}</script>"

        output = output.replace("</head>", head_tags + "</head>", 1)
        output = output.replace("</body>", body_tag + "</body>", 1)
        return output

    return fast_on_post_page
