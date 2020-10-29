---
layout: post
title:  "Introducing Gram"
date:   2020-10-17
categories: tutorial
author: akollegger
---


![Three phases helped by Neo4j Relate]({{ '/assets/posts/intro-to-relate-what.png' | relative_url }} "Code, test, deploy with Neo4j Relate"){: width="30%" style="float: right; margin: 0 0 0 1em"}
Neo4j Relate is a framework of tools, services and libraries for working with Neo4j, giving
the world's best graph database a world-class developer experience.

Neo4j Relate helps in three phases of your work.

- Code: simple, on-demand provisioning of Neo4j DBMS
- Test: integrating Neo4j into your end-to-end tests
- Deploy: monitoring and querying of production databases

Let's try it out. We'll use the `@relate/cli` command line tool running straight from `npx` to skip installation ([what's npx?](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)). Follow along or check out a tidy project which uses [relate-with-npm](https://github.com/akollegger/relate-with-npm/).

## Code: add Neo4j DBMS to your [stack](https://stackshare.io/neo4j)

![Get Neo4j]({{ '/assets/posts/intro-to-relate-get-neo4j.png' | relative_url }} "Get Neo4j"){: width="20%" style="float: left; margin: 0 2em 0 0"}

All projects, from quick experiments to global industry disruptions, need a technology stack that is right for
the job. When you need to add a database Relate makes it effortless to get Neo4j.

**1. Start with the one-time setup of a data environment:**

```Shell
npx @relate/cli env:init --name=relate-tutorials --type=LOCAL
```

Accept the default settings when prompted. Relate is still in early access,
so you'll also need to provide this semi-secret access code 'r31473':
```
Enter the access code you received from applying at https://neo4j.relate.by/invite:r31473
✔ Do you need to enable authentication? (y/N) · false
✔ Do you need to restrict access to the GraphQL API methods? (y/N) · false
✔ Are HTTP consumers required to have an API key? (y/N) · false
Creating environment... done
```

**2. Then install a Neo4j DBMS named "intro" into the data environment named "relate-tutorials":**

```
npx @relate/cli dbms:install 4.1.3 -e relate-tutorials -n intro
```

`Enter new passphrase:` will set the password for the admin user named "neo4j":

```
✔ Enter new passphrase · 
DOWNLOAD PROGRESS [████████████████████████████████████████] 100%
extracting neo4j... done
[b92ada41] intro
```

**3. Finally, start the DBMS named "intro" within the "relate-tutorials" environment:**

```
npx @relate/cli dbms:start -e relate-tutorials intro
```

A couple of commands, a bunch of prompts, just to start a database. 😖 Arrgghh! _Not_ easy!

Yes, that was a lot to do by hand. And we'll do more. 🙂
This demonstrates what Relate makes possible. 
The magic happens later when we flex our command-line skills and
incorporate Relate into common build tools.

## Test: create some data, modify it, check the results

OK, now the fun starts! Let's create a graph.

**1. create an access-token**

```
→ npx relate dbms:access-token -e relate-tutorials intro 
```

Enter the passphrase for the "neo4j" user which you set earlier:

```
✔ Enter passphrase · 
eyJ4NWMiOlsiTUlJREJ6Q0NBZStnQXdJQkFnSUJBVEFOQmdrcWhraUc5dzBCQVFVRkFEQkdNUkl3RUFZRFZRUURFd2x1Wlc4MGFpNWpiMjB4Q3pBSkJnTlZCQVlUQWxORk1SQXdEZ1lEVlFRS0V3ZEFjbVZzWVhSbE1SRXdEd1lEVlFRTEV3aEtWMVFnUVhWMGFEQWdGdzB5TURFd01qRXdPRFUyTlRKYUdBOHlNRFV3TVRBeU1UQTROVFkxTWxvd1JqRVNNQkFHQTFVRUF4TUpibVZ2TkdvdVkyOXRNUXN3Q1FZRFZRUUdFd0pUUlRFUU1BNEdBMVVFQ2hNSFFISmxiR0YwWlRFUk1BOEdBMVVFQ3hNSVNsZFVJRUYxZEdnd2dnRWlNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0SUJEd0F3Z2dFS0FvSUJBUURHRWhaV2FIckp2Vncxbll6ZFI1czZGZ2h4TVFpSlwvUG5yNkpzU2owR3hcL3huK0w4YlErZitUWEpXZ2hvREtPTGhxdDBjdXo1Y0tlYXV3Z05IVURFREFmZUFnUUhtT0Z1NmNPU2g3cTBYekJXdFVwQ09kczZsaXRJVE5PWnZadEpaWTlPUzBEZlNJeU5lUjRoNXlORHI2cUVIc0gyTjZjekhQWDZhaEtIXC9kYnNWREdUWHIwOVFIbkw0elBLcUdDM0J1WHlkOFZwNUJxVk44RHNRdGtaV3dmNGxhM2lsUTMzZ3dwWWIwQUJSUklCS0JjZWhRcHdwRFhpa2tRQjlTMEc2TkxVTHB5RmpTYjlDRldabmxDSlhJcWhnQ1MyMFdMdVhGRUx5N1dXM09mbm5VYjZuRjUwWXljVTQxa1o1ekFNNGVReHhFRDlhWG5WbnFIN2FqcXV3ekFnTUJBQUV3RFFZSktvWklodmNOQVFFRkJRQURnZ0VCQUxGaXIrK1kwT0l3d2RNb0JkUW5DbFpTM3A1QnRLb0NrOEdkNmpoeVFKaHMza0tSXC9aUk1VXC9sZ1RFRnNWSFdHRkc0MmNMeGt6U2dPTVhTMnVQcmhoWkI1OFZFSHVKVnJcL2lTUGtMQTRNNzNXeEVMZjNwelpPdTI2ZFwvVkFMNkpXR1FBK0NqWnhWSFdTQUtcL1dZdVRIVVgyelp6cjRmaG1lc1NhZkJVNG5hdGpMS3Y2TFloZjdkYXphUnFCbmdvYkJ3N09ETmI1d0dKakR0Uzd1aGhQTGNuRE9MNGRZemx6UUhsckdhaW9HcVlCU3V1a1dDTmRKR0RKVkZKVzZldEJPblRtSHFSZnNMcEUrS0dlYlMrc1hNOEY4VzdBSmJpOEtRZVlNRXQ2NHIrTHQ5RUhzYWdjXC9tUTc5aXQxeXZtY2pub2FmR0plY2JzZU1wSTB5UUFDZjlTaz0iXSwidHlwIjoiSldUIiwiYWxnIjoiUlM1MTIifQ.eyJhdWQiOiJyZWxhdGUiLCJuYmYiOjE2MDMyNzA4MDQsInNjb3BlIjpbImFkbWluIiwiUFVCTElDIl0sImlzcyI6Im5lbzRqIiwiZmxhZ3MiOltdLCJleHAiOjE2MDU4NjY0MDQsImlhdCI6MTYwMzI3MDgwNCwianRpIjoiQWc1T1gyamsiLCJ1c2VybmFtZSI6Im5lbzRqIn0.O9jJLVGC2BR4kIRaYIjRlt2DpdPmsY-VpN4KvxrpLrh54pH7OgVhluqeEFP8H4uvPOB5qGmXj6h_Ncgz53TVD_BN5qFVHaznfZ8lghaHAZCckWt_QOlljW-GLiQwT2q9Ni0Bm_805pYZNK18XA7QlyV50tg-lJlnh3I_eKyLtnWTCIIysDUvG7K6Tap4yInTKmtdhVtXoOLPdrcDR6YY-cz9tCdiYH9VDWR4xpZ28O2qJRTBOJbQDlea-Qe-SmPC7NYTQxlb0bugj-gAUUfOD0fmJWIc0uJDh38U9DQPUxDQI5JMoWAsu5jtQxUFhQoYclIbxfq_Vl5cDTxJvPo53Q
```


## Deploy: use Neo4j Browser

## Cleaning up

Remove all resources managed by Neo4j Relate.

MacOS:

```
rm -rf '~/Library/Caches/com.Neo4j.Relate/' '~/Library/Application Support/com.Neo4j.Relate/'

```