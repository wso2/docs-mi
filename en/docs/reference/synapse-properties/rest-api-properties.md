# REST APIs
## Introduction

A REST API in WSO2 Micro Integrator is a key component for exposing integration services. Each API is anchored at a user-defined URL context and will only process requests that fall under the given URL context.

An API should consist of one or more [resources](#rest-api-resource-properties), which represent the logical components of an API that can be accessed via specific HTTP methods, such as `GET`, `POST`, `PUT`, `DELETE` `PATCH`, `HEAD`, or `OPTIONS`. The REST API resource uses [sequences]({{base_path}}/reference/mediation-sequences) and [mediators]({{base_path}}/reference/mediators/about-mediators) to define the mediation logic. The [inSequence]({{base_path}}/reference/mediation-sequences/#inout-sequences) handles incoming requests and flows through the mediators. You can define a [faultSequence]({{base_path}}/reference/mediation-sequences/#fault-sequences) to handle any errors that may occur while mediating a message in a resource.

## Properties

See the topics given below for the list of properties that can be configured when [creating a REST API artifact]({{base_path}}/develop/creating-artifacts/creating-an-api/).

### REST API Properties

The following properties are required fields.

<table>
    <tr>
        <th>Property</th>
        <th>Description</th>
    </tr>
    <tr>
         <td>Name</td>
         <td>A unique name for the API.</td>
      </tr>
      <tr>
         <td>Context URL</td>
         <td>
            This is a part of the API's URL structure that defines the base path for the API. The context URL must be unique for an API deployed in WSO2 MI. The context URL is essential for routing HTTP requests to the correct API. For example, if the context URL is <code>/weather</code>, the API only handles HTTP requests with a URL path that starts with <code>/weather</code>.
         </td>
      </tr>
</table>

The following properties are optional fields.

<table>
    <tr>
        <th>Property</th>
        <th>Description</th>
    </tr>
      <tr>
         <td>Version</td>
         <td>The version is appended to the context URL as part of the base path. This allows different versions of an API to coexist while ensuring that each version can be invoked independently. This ensures that older versions of the API can continue to function without disruption when newer versions are introduced.</td>
      </tr>
      <tr>
         <td>Hostname</td>
         <td><p>The Host at which the API is exposed. If you do not enter a value, <code>localhost</code> is considered the default hostname. If required, you can bind a given API to a user-defined hostname. Add the defined hostname to the <code>/etc/hosts</code> file in your machine.</p>
         <div class="admonition note">
            <p class="admonition-title">Note</p>
            <p>This property has been deprecated and is no longer recommended for use.</p>
         </div>
         </td>
      </tr>
      <tr>
         <td>Port</td>
         <td>The Port of the REST API. If you do not enter a value, <code>8290</code> is considered the default hostname. If required, you can bind a given API to a user-defined port number. For this to work you have to use an inbound endpoint to expose the configured API. See the <a href="{{base_path}}/learn/integration-tutorials/using-inbound-endpoints">using inbound endpoint tutorial</a> for more information.
         <div class="admonition note">
            <p class="admonition-title">Note</p>
            <p>This property has been deprecated and is no longer recommended for use.</p>
         </div>
         </td>
      </tr>
</table>

### REST API Resource Properties

When you are creating a REST API artifact, you need to configure the API resource. Listed below are the properties you can configure when [defining an API resource]({{base_path}}/develop/creating-artifacts/creating-an-api/#add-new-api-resources).

<table>
    <tr>
        <th>Property</th>
        <th>Description</th>
    </tr>
    <tr>
        <td id="uri-style">URI Style</td>
        <td>
            This allows you to restrict the type of HTTP requests processed by a particular resource. A resource can be associated with a user-defined URL mapping or a URI template.
        </td>
    </tr>
    <tr>
        <td id="url-template">URI Template</td>
        <td>
            This property is enabled only if URI Template is specified as the URI style.
            A URI template represents the structure of the URLs using <a href="https://datatracker.ietf.org/doc/html/rfc6570">patterns and variables</a>. When a resource is associated with a URI template, all requests that match the template will be processed by the resource. 
            
            <div class="admonition info">
                <p class="admonition-title">Info</p>
                <p>URI templates can be used when you need to match dynamic path segments from the incoming URL and map them to variables in your integration logic.</p>
            </div>

            Some examples of valid URI templates are as follows:

            <table>
                <tr>
                    <th style="width:20%">URI Template</th>
                    <th style="width:15%">Sample URL</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td><code>/order/{orderId}</code></td>
                    <td><code>/order/A0001</code></td>
                    <td>
                        The identifiers within curly braces are considered variables. The value <code>A0001</code> is assigned to the variable <code>orderId</code>.
                    </td>
                </tr>
                <tr>
                    <td><code>/dictionary/{char}/{word}</code></td>
                    <td><code>/dictionary/c/cat</code></td>
                    <td>
                        In this case, the  value <code>c</code> is assigned to the variable <code>char</code> and the value <code>cat</code> is assigned to the variable <code>word</code>.
                    </td>
                </tr>   
            </table>
        <div class="admonition info">
            <p class="admonition-title">Info</p>
            <p>It is possible to retrieve the exact values of the two variables using the <a href="{{base_path}}/reference/synapse-properties/expressions/#get-property-function">get-property</a> expression and prefixing the variable with <code>uri.var</code>.</p>
            <p>For example: <code>&lt;property name=&quot;char&quot; expression=&quot;get-property(&#39;uri.var.char&#39;)&quot;/&gt;</code></p>
        </div>
        <div class="admonition note">
            <p class="admonition-title">Note</p>
            <p>When there are multiple resources that match the same or similar URI templates, the redirecting resource depends on the order in which the resources are defined. Therefore, it is recommended to avoid defining multiple resources with same or similar URI templates.</p>
        </div>
        </td>
    </tr>
    <tr>
        <td id="uri-mapping">URL Mapping</td>
        <td>
            This property is enabled only if URL Mapping is specified as the URI style.</br>
            When a resource is defined with a URL mapping, only those requests that match the given pattern will be processed by the resource. There are three types of URL mappings:</br>
            
            <table>
                <tr>
                    <th>Type</th>
                    <th>URI Template</th>
                    <th>What will match</th>
                    <th>What will not match</th>
                </tr>
                <tr>
                    <td>Path mappings</td>
                    <td><code>/news/</code></td>
                    <td><code>/news/</code>,<code>/news/southern</code></td>
                    <td><code>/news2/</code></td>
                </tr>
                <tr>
                    <td>Extension mappings</td>
                    <td><code>.jsp </code></td>
                    <td><code>/image.jsp</code>,<code>/news/weather.jsp</code></td>
                    <td><code>/abc.png</code></td>
                </tr>
                <tr>
                    <td>Exact mappings</td>
                    <td><code>/news</code></td>
                    <td><code>/news</code></td>
                    <td><code>/news/abc.png</code></td>
                </tr>  
            </table>
            For example, if the URL mapping is <code>/news/</code> and the HTTP method is <code>GET</code>, the resource will only process <code>GET</code> requests with a URL path that matches the pattern <code>/news/</code>. Therefore, the following example requests will be processed by the resource:</br>
            <code>GET /test/news/east</code>
            <code>GET /test/news/a?arg1=hello</code></br>
            The following example requests would not be handled by this resource:</br>
            <code>GET /test/new/east</code> (URL pattern does not match)
            <code>POST /test/news/east</code> (HTTP verb does not match)
        </td>
    </tr>
    <tr>
        <td>Protocol</td>
        <td>
            Specify the HTTP protocol that the resource should handle. This provides additional control over what requests are handled by a given resource. Possible Values are <code>HTTP</code> and <code>HTTPS</code>.
        </td>
    </tr>
</table>