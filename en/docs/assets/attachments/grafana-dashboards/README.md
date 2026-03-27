# Grafana Labs dashboards (source code tracking)

This folder holds source JSON for Grafana Labs dashboards.

When updating a dashboard:

1. Save the new JSON as `<id>_revN.json`.
2. Update the table below to the latest revision.
3. Share the updated file with the Digital Operations team to update the dashboard in the [WSO2 Grafana Labs](https://grafana.com/orgs/wso2/dashboards).
4. Update the version table in the docs at [Step 13: Import dashboards to Grafana](https://mi.docs.wso2.com/en/latest/observe-and-manage/setting-up-cloud-native-observability-on-a-vm/#step-13-import-dashboards-to-grafana).

## Latest revisions

| Grafana Labs ID | Dashboard name               | Revision | Updated    |
| --------------: | ---------------------------- |----------|------------|
|           12783 | Integration Cluster Metrics  | rev2     | 2026-03-05 |
|           12887 | Integration Node Metrics     | rev3     | 2026-03-05 |
|           12888 | API Metrics                  | rev5     | 2026-03-18 |
|           12889 | Proxy Service Metrics        | rev3     | 2026-03-18 |
|           12890 | Inbound Endpoint Metrics     | rev3     | 2026-03-18 |

## Change log

- 2026-03-05: Added initial versions from Grafana Labs.
- 2026-03-18: Updated API, Proxy Service and Inbound Endpoint Metrics dashboards with bug fixes.
