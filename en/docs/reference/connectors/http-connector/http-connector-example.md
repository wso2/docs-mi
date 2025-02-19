# HTTP Connector Example

The HTTP Connector enables you to send HTTP or HTTPS requests within an integration sequence. 

## What you'll build

This example explains how to use the HTTP Connector to send HTTP requests effectively in your integration projects.

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

1. Follow the steps in the [Create a Project]({{base_path}}/develop/create-integration-project/) documentation to set up the integration project.

2. Create a new `HTTP` connection.
    1. Navigate to **Project Overview** and click on **Add Artifact**.
    2. Select **Connections** under **Other Artifacts**.
       
        <img src="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png" title="Add connections artifact" width="800" alt="Add connections artifact"/>
   
    3. Select **HTTP** connector.
    4. Add the dependencies if not yet added.
    5. Use the following values to create the connection.
        - **Connection Name** - `JsonPlaceHolderConnection`
        - **Base URL** - `http://jsonplaceholder.typicode.com`
        - **Auth Type** - `None`

## Add integration logic

1. Navigate to the **Project Overview** page and click **Add Artifact**.

2. Under **Create an Integration**, select **API**.

3. Specify the API name as `JsonPlaceHolder` and the API context as `/jsonplaceholder`.

4. Create a resource with resource path `/getOnePost/{id}` and select `GET` as the method. This resource will retrieve information about a post.

5. Select the created resource, click the **+** sign, navigate to **Connections** and select the connection **JsonPlaceHolderConnection**. Then, select the **GET** operation to send a GET request.

6. In the form that opens, provide the following details:
    - **Relative Path** - `/posts/${params.uriParams.id}`
    - **Headers** - ""

7. Click the **+** icon below the **GET** operation and add a respond mediator.

    <img src="{{base_path}}/assets/img/integrate/connectors/http-connector-example-resource-1.png" title="HTTP connector example resource 1" width="100%" alt="HTTP connector example resource 1"/>

8. For the `JsonPlaceHolder` API, create another resource with resource path `/commentsForPost?postId={postId}` and select `GET` as the method. This resource will get comments for a post.

9. Select the created resource, click the **+** icon, navigate to **Connections** and select the connection **JsonPlaceHolderConnection**. Then select the **GET** operation to send a GET request.

10. In the form that opens, provide the following details:
     - **Relative Path** - `/comments?postId=${params.queryParams.postId}`
     - **Headers** - ""

11. Click the **+** icon below the **GET** operation and add a respond mediator.

    <img src="{{base_path}}/assets/img/integrate/connectors/http-connector-example-resource-2.png" title="HTTP connector example resource 2" width="100%" alt="HTTP connector example resource 2"/>

12. For the `JsonPlaceHolder` API, create another resource with resource path `/createPost` and select `POST` as the method. This resource will handle post creation.

13. Select the resource, click the **+** sign, navigate to **Connections**, and select the connection **JsonPlaceHolderConnection**. Then, select the **POST** operation to send a POST request.

14. In the form that opens, provide the following details:
    - **Relative Path** - `/posts`
    - **Headers** - ""
    - **Content Type** - Select `JSON`
    - **Request Body** - `${payload}`

15. Click the **+** icon below the **POST** operation and add a respond mediator.

    <img src="{{base_path}}/assets/img/integrate/connectors/http-connector-example-resource-3.png" title="HTTP connector example resource 3" width="100%" alt="HTTP connector example resource 3"/>

16. Create a resource for the `JsonPlaceHolder` API with the resource path `/replacePost` and select `PUT` as the method. This resource will replace an existing post.

17. Select the resource, click the **+** sign, navigate to **Connections**, and select the connection **JsonPlaceHolderConnection**. Then, select the **PUT** operation to send a PUT request.

18. In the form that opens, provide the following details:
    - **Relative Path** - `/posts/1`
    - **Headers** - ""
    - **Content Type** - Select `JSON`
    - **Request Body** -
        ```json
        {
            "userId": 1,
            "id": 1,
            "title": "christmas holiday",
            "body": "christmas holiday is coming"
        }
        ```

19. Click the **+** icon below the **PUT** operation and add a respond mediator.

    <img src="{{base_path}}/assets/img/integrate/connectors/http-connector-example-resource-4.png" title="HTTP connector example resource 4" width="100%" alt="HTTP connector example resource 4"/>

20. Create a resource for the `JsonPlaceHolder` API with the resource path `/updatePost` and select `PATCH` as the method. This resource will update an existing post.

21. Select the resource, click the **+** icon, navigate to **Connections**, and select the connection **JsonPlaceHolderConnection**. Then, select the **PATCH** operation to send a PATCH request.

22. In the form that opens, provide the following details:
    - **Relative Path** - `/posts/1`
    - **Headers** - ""
    - **Content Type** - Select `JSON`
    - **Payload** - `${payload}`

23. Click the **+** icon below the **PATCH** operation and add a respond mediator.

    <img src="{{base_path}}/assets/img/integrate/connectors/http-connector-example-resource-5.png" title="HTTP connector example resource 5" width="100%" alt="HTTP connector example resource 5"/>

24. Create a resource for the `JsonPlaceHolder` API with the resource path `/deletePost` and select `DELETE` as the method. This resource will handle post deletion.

25. Select the resource, click on the **+** sign, navigate to **Connections** and select the connection **JsonPlaceHolderConnection**. Then, select the **DELETE** operation to send a DELETE request.

26. In the form that opens, provide the following details:
    - **Relative Path** - `/posts/1`
    - **Headers** - ""

27. Click the **+** icon below the **DELETE** operation and add a respond mediator.

    <img src="{{base_path}}/assets/img/integrate/connectors/http-connector-example-resource-6.png" title="HTTP connector example resource 6" width="100%" alt="HTTP connector example resource 6"/>

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/http-connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

Follow these steps to deploy the exported CApp in the integration runtime.

**Deploying on Micro Integrator**
To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

## Test

### HTTP GET operation

Test getting a post. Send an HTTP request as below.

```bash
curl -X GET "http://localhost:8290/jsonPlaceHolder/getOnePost/1"
```

**Expected response**:

```json
{
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```

Test getting given comments for a post. Send an HTTP request as below.
    
```bash
curl -X GET "http://localhost:8290/jsonPlaceHolder/commentsForPost?postId=1"
```

**Expected response**:

```json
[
    {
        "postId": 1,
        "id": 1,
        "name": "id labore ex et quam laborum",
        "email": "Eliseo@gardner.biz",
        "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
        "postId": 1,
        "id": 2,
        "name": "quo vero reiciendis velit similique earum",
        "email": "Jayne_Kuhic@sydney.com",
        "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
    },
    {
        "postId": 1,
        "id": 3,
        "name": "odio adipisci rerum aut animi",
        "email": "Nikita@garfield.biz",
        "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
    },
    {
        "postId": 1,
        "id": 4,
        "name": "alias odio sit",
        "email": "Lew@alysha.tv",
        "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
    },
    {
        "postId": 1,
        "id": 5,
        "name": "vero eaque aliquid doloribus et culpa",
        "email": "Hayden@althea.biz",
        "body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
    }
]
```

### HTTP POST operation 

Test creating a post.

```bash
curl --request PATCH 'http://localhost:8290/jsonplaceholder/createPost' --header 'Content-Type: application/json' \
--data '{ "userId": 200, "id": 1, "title": "new post" }'
```

**Expected response**:

```json
{
    "userId": 1,
    "id": 1,
    "title": "new post"
}
```

### HTTP PUT operation 

Test replacing a post.

```bash
curl --request PATCH 'http://localhost:8290/jsonplaceholder/replacePost' --header 'Content-Type: application/json' \
--data '{ "userId": 100, "id": 1, "title": "santa is coming" }'
```

**Expected response**:

```json
{
    "userId": 100,
    "id": 1,
    "title": "santa is coming"
}
```

### HTTP PATCH operation

Test updating the post.

```bash
curl --request PATCH 'http://localhost:8290/jsonplaceholder/updatePost' --header 'Content-Type: application/json' \
--data '{ "title": "holiday is over" }'
```

**Expected response**:

```json
{
    "userId": 200,
    "id": 1,
    "title": "santa is coming"
}
```

### HTTP DELETE operation

Test deleting the post.

```bash
curl --request DELETE 'http://localhost:8290/jsonplaceholder/deletePost'
```

**Expected response**:

```json
{}
```

## How to create a HTTPS Connection?

1. Navigate to the project overview page and click **Add Artifact**. 
2. Under **Other Artifacts**, select **Connections**.
3. Choose the **HTTPS** connection.
4. Use the following values to configure the connection:
    - **Connection Name** - `HTTPSConnection`
    - **Base URL** - HTTPS URL Path
    - **Auth Type** - `None`
5. If a certificate is required for the HTTPS connection, it must be added as a certificate type configurable of the project. For more details on adding certificate type configurable, refer to the [Externalized Configuration]({{base_path}}/develop/externalized-configuration/) documentation.
