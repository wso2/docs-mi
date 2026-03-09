# Resource Allocation and Performance

This document summarizes the performance test results and capacity planning insights for WSO2 Integrator: MI deployed in the [Choreo Private Data Plane](https://wso2.com/choreo/docs/choreo-concepts/data-planes/#private-data-planes) environment. It provides guidance on how different resource allocations (CPU and memory) affect throughput (requests/sec) and response times for varying message sizes and concurrent user loads.

## Test setup

Performance testing was conducted within the WSO2 Choreo Private Data Plane (PDP). All components JMeter (load generator),WSO2 Integrator: MI, and the Netty echo service (backend) were deployed in the same PDP network to minimize external latency and isolate the performance characteristics of MI.

### Key environment details

- **Deployment model**: Containers running on Choreo Private Data Plane.
- **Backend service**: Netty HTTP echo service.
- **Load generation**: Apache JMeter 5.6.3.
- **Message sizes tested**: 1 KB, 10 KB, 100 KB, 500 KB, and 1 MB.
- **Concurrent users**: 50, 100, 500, and 1000.
- **Resource profiles**: 0.2 vCPU, 0.5 vCPU, 1 vCPU, and 2 vCPU with varying memory configurations.

### Limitations

- All tests were conducted using the default WSO2 Integrator: MI distribution, except for the 500 KB and 1 MB payload tests. The results may vary or become invalid if configurations such as buffer sizes or thread pool sizes are modified. 
- The tests were based on HTTP passthrough scenarios; results may differ for other mediation or integration patterns.
- Network latency was negligible as all the components were within the same PDP.
- Results are indicative of throughput and latency within Choreo PDP and may differ in multi-region or hybrid deployments.

## Server startup times

The startup time of WSO2 Integrator: MI containers was measured across different CPU and memory configurations. This metric helps determine cold start behavior, specially relevant for scaling scenarios where containers are frequently started and stopped.

| CPU   | Memory | Startup time (seconds) |
|-------|--------|-------------------------|
| 0.2   | 1 GB   | 120                     |
| 0.5   | 1 GB   | 50                     |
| 1.0   | 2 GB   | 35                     |
| 2.0   | 4 GB   | 25                     |

## Throughput and response times

The following tables present **throughput (requests/sec)** and **average response times** in milliseconds for each test scenario, categorized by message size, CPU, memory, and concurrent user count.

!!! note
    - Values marked as `N/A` indicate configurations that were considered unrealistic (for example, 1000 users on 0.2 CPU).
    - Throughput is measured in requests per second.
    - Average response time is measured in milliseconds (ms).
    - The tests were conducted using HTTP passthrough scenarios. Depending on your integration logic, the results may vary. Therefore, it is always recommended to perform load testing on your own integrations to determine the appropriate resource allocations.

## 1 KB message size

### Throughput (Requests/sec)

| CPU | Memory | 50 Users | 100 Users | 500 Users | 1000 Users |
|-----|--------|----------|-----------|-----------|------------|
| 0.2 | 1 GB   | 85.87        | 112.34        | 170.10   | <code>N/A</code> |
| 0.5 | 1 GB   | 145.67       | 322.74        | 280.70   | 357.17   |
| 1.0 | 2 GB   | 1238.07      | 1201.17       | 1036.40   | 795.54   |
| 2.0 | 4 GB   | 1326.10       | 1394.64       | 1356.74       | 1205.84  |

### Average response times (ms)

| CPU | Memory | 50 Users | 100 Users | 500 Users | 1000 Users |
|-----|--------|----------|-----------|-----------|------------|
| 0.2 | 1 GB   | 556.67        | 890.34        | 2456.00   | <code>N/A</code> |
| 0.5 | 1 GB   | 321.67       | 283.34        | 1411.34   | 2174.34   |
| 1.0 | 2 GB   | 38.00      | 78.34       | 337.34    | 879.67   |
| 2.0 | 4 GB   | 35.67       | 72.00       | 304.34       | 508.34  |

## 10 KB message size

### Throughput (Requests/sec)

| CPU | Memory | 50 Users | 100 Users | 500 Users | 1000 Users |
|-----|--------|----------|-----------|-----------|------------|
| 0.2 | 1 GB   | 56.60    | 30.77     | <code>N/A</code> | <code>N/A</code> |
| 0.5 | 1 GB   | 205.90   | 248.44    | 223.24    | 281.24 |
| 1.0 | 2 GB   | 593.70   | 713.60    | 868.17    | 723.87 |
| 2.0 | 4 GB   | 1090.10  | 1094.44   | 978.30    | 973.44 |

### Average response times (ms)

| CPU | Memory | 50 Users | 100 Users | 500 Users | 1000 Users |
|-----|--------|----------|-----------|-----------|------------|
| 0.2 | 1 GB   | 821.67    | 3060.00      | <code>N/A</code> | <code>N/A</code> |
| 0.5 | 1 GB   | 222.67    | 399.00       | 2566.34   | 2666.00 |
| 1.0 | 2 GB   | 81.00        | 128.00       | 404.00       | 871.00 |
| 2.0 | 4 GB   | 42.34     | 85.34     | 356.00       | 642.67 |

## 100 KB message size

### Throughput (Requests/sec)

| CPU | Memory | 50 Users | 100 Users | 500 Users | 1000 Users |
|-----|--------|----------|-----------|-----------|------------|
| 0.2 | 1 GB   | 22.37    | 23.90     | <code>N/A</code> | <code>N/A</code> |
| 0.5 | 1 GB   | 116.60   | 164.64    | 128.80    | <code>N/A</code> |
| 1.0 | 2 GB   | 223.27   | 278.24    | 224.10    | 219.24 |
| 2.0 | 4 GB   | 456.04   | 424.97    | 311.47    | 298 |

### Average response times (ms)

| CPU | Memory | 50 Users | 100 Users | 500 Users | 1000 Users |
|-----|--------|----------|-----------|-----------|------------|
| 0.2 | 1 GB   | 2617.34   | 2780.00      | <code>N/A</code> | <code>N/A</code> |
| 0.5 | 1 GB   | 411.34    | 547.00       | 3301.67   | <code>N/A</code> |
| 1.0 | 2 GB   | 215.67    | 344.00       | 1698.67   | 3196.00 |
| 2.0 | 4 GB   | 105.34    | 214.34    | 1337.34   | 2559.34 |

## 500 KB message size

### Throughput (Requests/sec)

| CPU | Memory | 50 Users | 100 Users | 500 Users | 1000 Users |
|-----|--------|----------|-----------|-----------|------------|
| 0.2 | 1 GB   | 15.17    | <code>N/A</code> | <code>N/A</code> | <code>N/A</code> |
| 0.5 | 1 GB   | 27.97    | 31.94     | <code>N/A</code> | <code>N/A</code> |
| 1.0 | 2 GB   | 53.94    | 57.97     | 39.54     | 27.14 |
| 2.0 | 4 GB   | 102.57   | 85.97     | 85.60     | 74.47 |

### Average response times (ms)

| CPU | Memory | 50 Users | 100 Users | 500 Users | 1000 Users |
|-----|--------|----------|-----------|-----------|------------|
| 0.2 | 1 GB   | 4196.34   | <code>N/A</code> | <code>N/A</code> | <code>N/A</code> |
| 0.5 | 1 GB   | 1715.00      | 3099.34   | <code>N/A</code> | <code>N/A</code> |
| 1.0 | 2 GB   | 915.67    | 1498.00      | 9756.67   | 21238.34 |
| 2.0 | 4 GB   | 454.34    | 1053.67   | 4518.34   | 9917.67 |

## 1 MB message size

### Throughput (Requests/sec)

| CPU | Memory | 50 Users | 100 Users | 500 Users | 1000 Users |
|-----|--------|----------|-----------|-----------|------------|
| 0.5 | 1 GB   | 23.54    | <code>N/A</code> | <code>N/A</code> | <code>N/A</code> |
| 1.0 | 2 GB   | 43.47    | 82.47     | 66.90     | <code>N/A</code> |
| 2.0 | 4 GB   | 164.74   | 167.67    | 141.70    | 105.87 |

### Average response times (ms)

| CPU | Memory | 50 Users | 100 Users | 500 Users | 1000 Users |
|-----|--------|----------|-----------|-----------|------------|
| 0.5 | 1 GB   | 2101.00      | <code>N/A</code> | <code>N/A</code> | <code>N/A</code> |
| 1.0 | 2 GB   | 1110.67   | 1123.34   | 5787.67   | <code>N/A</code> |
| 2.0 | 4 GB   | 335.67    | 540.67    | 1929.67   | 3945.00 |
