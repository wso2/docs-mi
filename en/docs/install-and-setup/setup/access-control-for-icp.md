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

  <table>
    <thead>
      <tr>
        <th>Mapping Level</th>
        <th>Effective Scope</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Organization</td>
        <td>All projects and integrations</td>
      </tr>
      <tr>
        <td>Project</td>
        <td>All integrations within that project</td>
      </tr>
      <tr>
        <td>Component</td>
        <td>That single integration only</td>
      </tr>
    </tbody>
  </table>

- **Applicable environments** — either **All Environments** or a set of named
  environments (e.g. only *dev*). When scoped to selected environments, the
  mapping only takes effect for runtimes in those environments.

Mappings created at a higher level are visible at lower levels but can only be
removed at the level where they were created.

### Where things live

Users, roles, groups, and their permissions are all managed at the organization
level. Project and integration levels exist solely to create and remove
**mappings** — narrowing who has what access where.

<table>
  <thead>
    <tr>
      <th>Capability</th>
      <th>Organization</th>
      <th>Project</th>
      <th>Integration</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Create / delete users</td>
      <td>Yes</td>
      <td>--</td>
      <td>--</td>
    </tr>
    <tr>
      <td>Create / delete roles</td>
      <td>Yes</td>
      <td>--</td>
      <td>--</td>
    </tr>
    <tr>
      <td>Edit role permissions</td>
      <td>Yes</td>
      <td>--</td>
      <td>--</td>
    </tr>
    <tr>
      <td>Create / delete groups</td>
      <td>Yes</td>
      <td>--</td>
      <td>--</td>
    </tr>
    <tr>
      <td>Add / remove users from groups</td>
      <td>Yes</td>
      <td>--</td>
      <td>--</td>
    </tr>
    <tr>
      <td>Map roles to groups</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Scope mappings to environments</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>


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

<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Reset Password</td>
      <td>Opens a dialog to set a new password</td>
    </tr>
    <tr>
      <td>Unlock Account</td>
      <td>Re-enables a locked account</td>
    </tr>
    <tr>
      <td>Revoke Sessions</td>
      <td>Terminates active sessions (disabled for your own account)</td>
    </tr>
  </tbody>
</table>

---

## Reference

### Default roles

<table>
  <thead>
    <tr>
      <th>Role</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Admin</td>
      <td>Administrative access to projects and integrations</td>
    </tr>
    <tr>
      <td>Developer</td>
      <td>Development access with limited permissions</td>
    </tr>
    <tr>
      <td>Project Admin</td>
      <td>Administrative access to a specific project</td>
    </tr>
    <tr>
      <td>Super Admin</td>
      <td>Full access to all resources and permissions</td>
    </tr>
    <tr>
      <td>Viewer</td>
      <td>Read-only access with view permissions only</td>
    </tr>
  </tbody>
</table>

### Default groups

<table>
  <thead>
    <tr>
      <th>Group</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Super Admins</td>
      <td>Super administrators with full access</td>
    </tr>
    <tr>
      <td>Administrators</td>
      <td>Administrators</td>
    </tr>
    <tr>
      <td>Developers</td>
      <td>Developers</td>
    </tr>
  </tbody>
</table>

Additionally, each new project auto-creates a `<Project Name> Admins` group
mapped to the *Project Admin* role at the Project level.

### Permissions

**Environment-Management**

<table>
  <thead>
    <tr>
      <th>Permission</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>environment_mgt:manage</code></td>
      <td>Full environment management</td>
    </tr>
    <tr>
      <td><code>environment_mgt:manage_nonprod</code></td>
      <td>Manage non-critical environments only</td>
    </tr>
  </tbody>
</table>

**Integration-Management**

<table>
  <thead>
    <tr>
      <th>Permission</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>integration_mgt:edit</code></td>
      <td>Edit integration settings</td>
    </tr>
    <tr>
      <td><code>integration_mgt:manage</code></td>
      <td>Create/delete integrations</td>
    </tr>
    <tr>
      <td><code>integration_mgt:view</code></td>
      <td>View integration details</td>
    </tr>
  </tbody>
</table>

**Observability-Management**

<table>
  <thead>
    <tr>
      <th>Permission</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>observability_mgt:view_insights</code></td>
      <td>View metrics and dashboards</td>
    </tr>
    <tr>
      <td><code>observability_mgt:view_logs</code></td>
      <td>View runtime logs</td>
    </tr>
  </tbody>
</table>

**Project-Management**

<table>
  <thead>
    <tr>
      <th>Permission</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>project_mgt:edit</code></td>
      <td>Edit project settings</td>
    </tr>
    <tr>
      <td><code>project_mgt:manage</code></td>
      <td>Create/delete projects</td>
    </tr>
    <tr>
      <td><code>project_mgt:view</code></td>
      <td>View project details</td>
    </tr>
  </tbody>
</table>

**User-Management**

<table>
  <thead>
    <tr>
      <th>Permission</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>user_mgt:manage_groups</code></td>
      <td>Create/delete groups</td>
    </tr>
    <tr>
      <td><code>user_mgt:manage_roles</code></td>
      <td>Create/delete roles</td>
    </tr>
    <tr>
      <td><code>user_mgt:manage_users</code></td>
      <td>Create/delete users</td>
    </tr>
    <tr>
      <td><code>user_mgt:update_group_roles</code></td>
      <td>Assign/remove roles from groups</td>
    </tr>
    <tr>
      <td><code>user_mgt:update_users</code></td>
      <td>Edit user properties</td>
    </tr>
  </tbody>
</table>
