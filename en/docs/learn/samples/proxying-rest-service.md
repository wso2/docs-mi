# Proxying a REST Service Sample

This sample includes a service that acts as a proxy for an existing RESTful service. When a client invokes this service, it forwards the message to the backend service without altering its content.

Specifically, the sample features a REST API called UserInfoRestAPI, which serves as the proxy. Additionally, it includes an HTTP endpoint named UsersHttpEP that represents the actual backend service within the MI context.

## Deploying the sample

1.  Open the sample by clicking on the **Proxying a REST Service** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1.  Open a terminal and run the following commands to invoke the API.

    ```bash
    curl --location 'http://localhost:8290/userInfo/users' 
    ```

    You will receive a response like following.

    ```
    {
        "page": 1,
        "per_page": 6,
        "total": 12,
        "total_pages": 2,
        "data": [
            {
                "id": 1,
                "email": "george.bluth@reqres.in",
                "first_name": "George",
                "last_name": "Bluth",
                "avatar": "https://reqres.in/img/faces/1-image.jpg"
            },
            {
                "id": 2,
                "email": "janet.weaver@reqres.in",
                "first_name": "Janet",
                "last_name": "Weaver",
                "avatar": "https://reqres.in/img/faces/2-image.jpg"
            },
            {
                "id": 3,
                "email": "emma.wong@reqres.in",
                "first_name": "Emma",
                "last_name": "Wong",
                "avatar": "https://reqres.in/img/faces/3-image.jpg"
            },
            {
                "id": 4,
                "email": "eve.holt@reqres.in",
                "first_name": "Eve",
                "last_name": "Holt",
                "avatar": "https://reqres.in/img/faces/4-image.jpg"
            },
            {
                "id": 5,
                "email": "charles.morris@reqres.in",
                "first_name": "Charles",
                "last_name": "Morris",
                "avatar": "https://reqres.in/img/faces/5-image.jpg"
            },
            {
                "id": 6,
                "email": "tracey.ramos@reqres.in",
                "first_name": "Tracey",
                "last_name": "Ramos",
                "avatar": "https://reqres.in/img/faces/6-image.jpg"
            }
        ],
        "support": {
        "url": "https://reqres.in/#support-heading",
        "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
    }
    ```

2.  You can also [run the unit test case]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.
