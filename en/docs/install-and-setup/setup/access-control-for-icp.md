# Access Control for the Integration Control Plane

## Model

### Roles and Permissions

A **role** is a named set of permissions. ICP ships with five built-in roles
(see [Default Roles](#default-roles)). You can also create custom ones.

Permissions are grouped into five categories: Environment-Management,
Integration-Management, Observability-Management, Project-Management, and
User-Management. Each category contains two to five granular permissions
(see [Permissions](#permissions)).

Roles and their permissions are defined at the **organization level** only.
Lower levels (project, integration) can use them but cannot change what a role
is allowed to do.

### Groups and Users

A **group** collects users. Groups and users are also created at the
organization level. One user can belong to many groups.

### Role-to-Group Mappings

A **mapping** binds a role to a group, granting every user in that group the
role's permissions. A mapping has two extra dimensions:

- **Mapping level** — the level where the mapping was created (Organization,
  Project, or Component). This controls effective scope:

  | Mapping Level | Effective Scope                              |
  | ------------- | -------------------------------------------- |
  | Organization  | All projects and integrations                |
  | Project       | All integrations within that project         |
  | Component     | That single integration only                 |

- **Applicable environments** — either **All Environments** or a set of named
  environments (e.g. only *dev*). When scoped to selected environments, the
  mapping only takes effect for runtimes in those environments.

Mappings created at a higher level are visible at lower levels but can only be
removed at the level where they were created.

### Where Things Live

Users, roles, groups, and their permissions are all managed at the organization
level. Project and integration levels exist solely to create and remove
**mappings** — narrowing who has what access where.

| Capability                     | Organization | Project | Integration |
| ------------------------------ | ------------ | ------- | ----------- |
| Create / delete users          | Yes          | --      | --          |
| Create / delete roles          | Yes          | --      | --          |
| Edit role permissions          | Yes          | --      | --          |
| Create / delete groups         | Yes          | --      | --          |
| Add / remove users from groups | Yes          | --      | --          |
| Map roles to groups            | Yes          | Yes     | Yes         |
| Scope mappings to environments | Yes          | Yes     | Yes         |

---

## Recipes

### Give a team access to everything

Use an organization-level mapping with **All Environments**.

1. Go to **Access-control** in the organization sidebar.
2. Open the **Groups** tab and click **+ Create Group**. Name it (e.g.
   *Platform Team*) and click **Create**.
3. Open the new group. In the **USERS** tab, click **+ Add Users** and select
   the team members.
4. Switch to the **ROLES** tab. Click **+ Add Roles**.
5. In the dialog, select the desired role (e.g. *Admin*), leave
   **All Environments** selected, and click **Add**.

Every user in that group now has the Admin role across all projects,
integrations, and environments.

### Give a team access to one project only

Create the mapping at the **project level** so it is scoped to that project.

1. Navigate to the project and open **Access-control** in the project sidebar.
2. Open the **Roles** tab and click the role you want to assign (e.g.
   *Developer*).
3. On the **Manage Role** page, click **+ Add Group**.
4. Select the group, leave **All Environments**, and click **Assign**.

The mapping's level is recorded as **Project**. Members of that group now have
the Developer role within this project only — other projects are unaffected.

**Note:** ICP auto-creates a `<Project Name> Admins` group with the
*Project Admin* role whenever you create a project. You can add users to this
group instead of creating a new mapping.

### Give a team read-only access to production

Combine a restrictive role with environment scoping.

1. Go to the organization **Access-control** > **Roles** tab.
2. Click the *Viewer* role (or create a custom read-only role).
3. In the **GROUPS** tab, click **+ Add Groups**.
4. Select the group, choose **Selected Environments**, pick **prod**, and
   click **Assign**.

Members of that group can view resources in the *prod* environment but have no
access in *dev* or other environments (unless granted separately).

### Grant a developer access to a single integration

Create the mapping at the **integration (component) level**.

1. Navigate to the integration and open **Access-control** in the integration
   sidebar.
2. Open the **Roles** tab, click the target role (e.g. *Developer*).
3. Click **+ Add Group**, select the group, choose environments, and click
   **Assign**.

The mapping level is **Component**. The group's users have that role only for
this integration.

### Create a custom role

1. Go to the organization **Access-control** > **Roles** tab.
2. Click **+ Create Role**.
3. Enter a **Role Name** and optional **Description**.
4. Expand the permission categories and check the permissions you need (see
   [Permissions](#permissions) for the full list).
5. Click **Create**.

To edit permissions later, click the role to open **Manage Role** and use the
**PERMISSIONS** tab. Click **Save Permissions** after making changes.

### Revoke access

**Remove a mapping:** Navigate to the level where the mapping was created
(check the **Mapping Level** badge). Open the role or group detail and click
the **Delete** icon on the mapping row.

**Remove a user from a group:** Go to the organization **Access-control** >
**Groups** tab. Open the group, find the user in the **USERS** tab, and click
the **Delete** icon.

**Delete a user entirely:** Go to the organization **Access-control** >
**Users** tab and click the **Delete** icon on the user row. This is disabled
for super admin accounts.

**Delete a role or group:** Go to the organization **Access-control** > **Roles**
or **Groups** tab and click the **Delete** icon. Roles that are still mapped to
groups cannot be deleted — remove the mappings first.

### Reset a password or unlock an account

Go to the organization **Access-control** > **Users** tab. Each user row has
action icons:

| Action          | Notes                                     |
| --------------- | ----------------------------------------- |
| Reset Password  | Opens a dialog to set a new password      |
| Unlock Account  | Re-enables a locked account               |
| Revoke Sessions | Terminates active sessions (disabled for your own account) |

---

## Reference

### Default Roles

| Role          | Description                                        |
| ------------- | -------------------------------------------------- |
| Admin         | Administrative access to projects and integrations |
| Developer     | Development access with limited permissions        |
| Project Admin | Administrative access to a specific project        |
| Super Admin   | Full access to all resources and permissions       |
| Viewer        | Read-only access with view permissions only        |

### Default Groups

| Group          | Description                                         |
| -------------- | --------------------------------------------------- |
| Super Admins   | Super administrators with full access               |
| Administrators | Administrators                                      |
| Developers     | Developers                                          |

Additionally, each new project auto-creates a `<Project Name> Admins` group
mapped to the *Project Admin* role at the Project level.

### Permissions

**Environment-Management**

| Permission                       | Description                           |
| -------------------------------- | ------------------------------------- |
| `environment_mgt:manage`         | Full environment management           |
| `environment_mgt:manage_nonprod` | Manage non-critical environments only |

**Integration-Management**

| Permission               | Description                |
| ------------------------ | -------------------------- |
| `integration_mgt:edit`   | Edit integration settings  |
| `integration_mgt:manage` | Create/delete integrations |
| `integration_mgt:view`   | View integration details   |

**Observability-Management**

| Permission                        | Description                 |
| --------------------------------- | --------------------------- |
| `observability_mgt:view_insights` | View metrics and dashboards |
| `observability_mgt:view_logs`     | View runtime logs           |

**Project-Management**

| Permission           | Description           |
| -------------------- | --------------------- |
| `project_mgt:edit`   | Edit project settings |
| `project_mgt:manage` | Create/delete projects |
| `project_mgt:view`   | View project details  |

**User-Management**

| Permission                    | Description                     |
| ----------------------------- | ------------------------------- |
| `user_mgt:manage_groups`      | Create/delete groups            |
| `user_mgt:manage_roles`       | Create/delete roles             |
| `user_mgt:manage_users`       | Create/delete users             |
| `user_mgt:update_group_roles` | Assign/remove roles from groups |
| `user_mgt:update_users`       | Edit user properties            |
