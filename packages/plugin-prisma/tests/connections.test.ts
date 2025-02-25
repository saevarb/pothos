import { execute } from 'graphql';
import { gql } from 'graphql-tag';
import { prisma } from './example/builder';
import schema from './example/schema';

let queries: unknown[] = [];
prisma.$use((params, next) => {
  queries.push(params);

  return next(params);
});

describe('prisma', () => {
  afterEach(() => {
    queries = [];
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('connection with nested relations', async () => {
    const query = gql`
      query {
        userConnection {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              profile {
                bio
              }
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "userConnection": Object {
            "edges": Array [
              Object {
                "node": Object {
                  "id": "VXNlcjox",
                  "profile": Object {
                    "bio": "Saepe deserunt animi quia.",
                  },
                },
              },
              Object {
                "node": Object {
                  "id": "VXNlcjoy",
                  "profile": null,
                },
              },
              Object {
                "node": Object {
                  "id": "VXNlcjoz",
                  "profile": Object {
                    "bio": "Fugit vel voluptas porro qui natus earum.",
                  },
                },
              },
              Object {
                "node": Object {
                  "id": "VXNlcjo0",
                  "profile": Object {
                    "bio": "Doloribus eos quo.",
                  },
                },
              },
              Object {
                "node": Object {
                  "id": "VXNlcjo1",
                  "profile": Object {
                    "bio": "Iste velit dolorem amet aut nostrum.",
                  },
                },
              },
              Object {
                "node": Object {
                  "id": "VXNlcjo2",
                  "profile": Object {
                    "bio": "Provident dolorum autem fugiat eum quas accusantium corporis cumque explicabo.",
                  },
                },
              },
              Object {
                "node": Object {
                  "id": "VXNlcjo3",
                  "profile": Object {
                    "bio": "Cupiditate totam saepe asperiores eius est culpa odit ea.",
                  },
                },
              },
              Object {
                "node": Object {
                  "id": "VXNlcjo4",
                  "profile": Object {
                    "bio": "Optio dolor et facilis repellendus dignissimos expedita.",
                  },
                },
              },
              Object {
                "node": Object {
                  "id": "VXNlcjo5",
                  "profile": Object {
                    "bio": "Omnis eum magni ut eveniet maxime.",
                  },
                },
              },
              Object {
                "node": Object {
                  "id": "VXNlcjoxMA==",
                  "profile": Object {
                    "bio": "Mollitia cumque est ullam non qui et beatae recusandae.",
                  },
                },
              },
            ],
            "pageInfo": Object {
              "endCursor": "R1BDOk46MTA=",
              "hasNextPage": true,
              "hasPreviousPage": false,
              "startCursor": "R1BDOk46MQ==",
            },
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findMany",
          "args": Object {
            "include": Object {
              "profile": true,
            },
            "skip": 0,
            "take": 11,
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });
  it('after', async () => {
    const query = gql`
      query {
        userConnection(first: 1, after: "R1BDOk46MQ==") {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "userConnection": Object {
            "edges": Array [
              Object {
                "cursor": "R1BDOk46Mg==",
                "node": Object {
                  "id": "VXNlcjoy",
                },
              },
            ],
            "pageInfo": Object {
              "endCursor": "R1BDOk46Mg==",
              "hasNextPage": true,
              "hasPreviousPage": true,
              "startCursor": "R1BDOk46Mg==",
            },
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findMany",
          "args": Object {
            "cursor": Object {
              "id": 1,
            },
            "skip": 1,
            "take": 2,
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });

  it('limit', async () => {
    const query = gql`
      query {
        userConnection(first: 100, after: "R1BDOk46MQ==") {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "userConnection": Object {
            "edges": Array [
              Object {
                "cursor": "R1BDOk46Mg==",
                "node": Object {
                  "id": "VXNlcjoy",
                },
              },
              Object {
                "cursor": "R1BDOk46Mw==",
                "node": Object {
                  "id": "VXNlcjoz",
                },
              },
              Object {
                "cursor": "R1BDOk46NA==",
                "node": Object {
                  "id": "VXNlcjo0",
                },
              },
              Object {
                "cursor": "R1BDOk46NQ==",
                "node": Object {
                  "id": "VXNlcjo1",
                },
              },
              Object {
                "cursor": "R1BDOk46Ng==",
                "node": Object {
                  "id": "VXNlcjo2",
                },
              },
              Object {
                "cursor": "R1BDOk46Nw==",
                "node": Object {
                  "id": "VXNlcjo3",
                },
              },
              Object {
                "cursor": "R1BDOk46OA==",
                "node": Object {
                  "id": "VXNlcjo4",
                },
              },
              Object {
                "cursor": "R1BDOk46OQ==",
                "node": Object {
                  "id": "VXNlcjo5",
                },
              },
              Object {
                "cursor": "R1BDOk46MTA=",
                "node": Object {
                  "id": "VXNlcjoxMA==",
                },
              },
              Object {
                "cursor": "R1BDOk46MTE=",
                "node": Object {
                  "id": "VXNlcjoxMQ==",
                },
              },
              Object {
                "cursor": "R1BDOk46MTI=",
                "node": Object {
                  "id": "VXNlcjoxMg==",
                },
              },
              Object {
                "cursor": "R1BDOk46MTM=",
                "node": Object {
                  "id": "VXNlcjoxMw==",
                },
              },
              Object {
                "cursor": "R1BDOk46MTQ=",
                "node": Object {
                  "id": "VXNlcjoxNA==",
                },
              },
              Object {
                "cursor": "R1BDOk46MTU=",
                "node": Object {
                  "id": "VXNlcjoxNQ==",
                },
              },
              Object {
                "cursor": "R1BDOk46MTY=",
                "node": Object {
                  "id": "VXNlcjoxNg==",
                },
              },
            ],
            "pageInfo": Object {
              "endCursor": "R1BDOk46MTY=",
              "hasNextPage": true,
              "hasPreviousPage": true,
              "startCursor": "R1BDOk46Mg==",
            },
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findMany",
          "args": Object {
            "cursor": Object {
              "id": 1,
            },
            "skip": 1,
            "take": 16,
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });
  it('before', async () => {
    const query = gql`
      query {
        userConnection(last: 100, before: "R1BDOk46NA==") {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "userConnection": Object {
            "edges": Array [
              Object {
                "cursor": "R1BDOk46MQ==",
                "node": Object {
                  "id": "VXNlcjox",
                },
              },
              Object {
                "cursor": "R1BDOk46Mg==",
                "node": Object {
                  "id": "VXNlcjoy",
                },
              },
              Object {
                "cursor": "R1BDOk46Mw==",
                "node": Object {
                  "id": "VXNlcjoz",
                },
              },
            ],
            "pageInfo": Object {
              "endCursor": "R1BDOk46Mw==",
              "hasNextPage": true,
              "hasPreviousPage": false,
              "startCursor": "R1BDOk46MQ==",
            },
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findMany",
          "args": Object {
            "cursor": Object {
              "id": 4,
            },
            "skip": 1,
            "take": -16,
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });
  it('end', async () => {
    const query = gql`
      query {
        userConnection(after: "R1BDOk46OTc=") {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "userConnection": Object {
            "edges": Array [
              Object {
                "cursor": "R1BDOk46OTg=",
                "node": Object {
                  "id": "VXNlcjo5OA==",
                },
              },
              Object {
                "cursor": "R1BDOk46OTk=",
                "node": Object {
                  "id": "VXNlcjo5OQ==",
                },
              },
              Object {
                "cursor": "R1BDOk46MTAw",
                "node": Object {
                  "id": "VXNlcjoxMDA=",
                },
              },
            ],
            "pageInfo": Object {
              "endCursor": "R1BDOk46MTAw",
              "hasNextPage": false,
              "hasPreviousPage": true,
              "startCursor": "R1BDOk46OTg=",
            },
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findMany",
          "args": Object {
            "cursor": Object {
              "id": 97,
            },
            "skip": 1,
            "take": 11,
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });

  it('nested connection', async () => {
    const query = gql`
      query {
        userConnection(first: 1) {
          edges {
            cursor
            node {
              postsConnection {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "userConnection": Object {
            "edges": Array [
              Object {
                "cursor": "R1BDOk46MQ==",
                "node": Object {
                  "postsConnection": Object {
                    "edges": Array [
                      Object {
                        "node": Object {
                          "id": "250",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "249",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "248",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "247",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "246",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "245",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "244",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "243",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "242",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "241",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "240",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "239",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "238",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "237",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "236",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "235",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "234",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "233",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "232",
                        },
                      },
                      Object {
                        "node": Object {
                          "id": "231",
                        },
                      },
                    ],
                    "pageInfo": Object {
                      "endCursor": "R1BDOkQ6MTM1NTI3MDQwMDIzMA==",
                      "hasNextPage": true,
                      "hasPreviousPage": false,
                      "startCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                    },
                  },
                },
              },
            ],
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findMany",
          "args": Object {
            "include": Object {
              "posts": Object {
                "include": Object {
                  "comments": Object {
                    "include": Object {
                      "author": true,
                    },
                    "take": 3,
                  },
                },
                "orderBy": Object {
                  "createdAt": "desc",
                },
                "skip": 0,
                "take": 21,
              },
            },
            "skip": 0,
            "take": 2,
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });

  it('nested connection after', async () => {
    const query = gql`
      query {
        userConnection(first: 1) {
          edges {
            cursor
            node {
              postsConnection(first: 2, after: "R1BDOkQ6MTM1NTI3MDQwMDI0NQ==") {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges {
                  cursor
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "userConnection": Object {
            "edges": Array [
              Object {
                "cursor": "R1BDOk46MQ==",
                "node": Object {
                  "postsConnection": Object {
                    "edges": Array [
                      Object {
                        "cursor": "R1BDOkQ6MTM1NTI3MDQwMDI0NA==",
                        "node": Object {
                          "id": "245",
                        },
                      },
                      Object {
                        "cursor": "R1BDOkQ6MTM1NTI3MDQwMDI0Mw==",
                        "node": Object {
                          "id": "244",
                        },
                      },
                    ],
                    "pageInfo": Object {
                      "endCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0Mw==",
                      "hasNextPage": true,
                      "hasPreviousPage": true,
                      "startCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0NA==",
                    },
                  },
                },
              },
            ],
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findMany",
          "args": Object {
            "include": Object {
              "posts": Object {
                "cursor": Object {
                  "createdAt": 2012-12-12T00:00:00.245Z,
                },
                "include": Object {
                  "comments": Object {
                    "include": Object {
                      "author": true,
                    },
                    "take": 3,
                  },
                },
                "orderBy": Object {
                  "createdAt": "desc",
                },
                "skip": 1,
                "take": 3,
              },
            },
            "skip": 0,
            "take": 2,
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });

  it('query from args', async () => {
    const query = gql`
      query {
        userConnection(first: 1) {
          edges {
            cursor
            node {
              postsConnection(first: 2, after: "R1BDOkQ6MTM1NTI3MDQwMDI0OA==", oldestFirst: true) {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges {
                  cursor
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "userConnection": Object {
            "edges": Array [
              Object {
                "cursor": "R1BDOk46MQ==",
                "node": Object {
                  "postsConnection": Object {
                    "edges": Array [
                      Object {
                        "cursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                        "node": Object {
                          "id": "250",
                        },
                      },
                    ],
                    "pageInfo": Object {
                      "endCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                      "hasNextPage": false,
                      "hasPreviousPage": true,
                      "startCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                    },
                  },
                },
              },
            ],
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findMany",
          "args": Object {
            "include": Object {
              "posts": Object {
                "cursor": Object {
                  "createdAt": 2012-12-12T00:00:00.248Z,
                },
                "include": Object {
                  "comments": Object {
                    "include": Object {
                      "author": true,
                    },
                    "take": 3,
                  },
                },
                "orderBy": Object {
                  "createdAt": "asc",
                },
                "skip": 1,
                "take": 3,
              },
            },
            "skip": 0,
            "take": 2,
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });

  it('double related connection', async () => {
    const query = gql`
      query {
        userConnection(first: 1) {
          edges {
            cursor
            node {
              postsConnection(first: 2, after: "R1BDOkQ6MTM1NTI3MDQwMDI0OA==", oldestFirst: true) {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges {
                  cursor
                  node {
                    id
                  }
                }
              }
              newPosts: postsConnection(first: 2) {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges {
                  cursor
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "userConnection": Object {
            "edges": Array [
              Object {
                "cursor": "R1BDOk46MQ==",
                "node": Object {
                  "newPosts": Object {
                    "edges": Array [
                      Object {
                        "cursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                        "node": Object {
                          "id": "250",
                        },
                      },
                      Object {
                        "cursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OA==",
                        "node": Object {
                          "id": "249",
                        },
                      },
                    ],
                    "pageInfo": Object {
                      "endCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OA==",
                      "hasNextPage": true,
                      "hasPreviousPage": false,
                      "startCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                    },
                  },
                  "postsConnection": Object {
                    "edges": Array [
                      Object {
                        "cursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                        "node": Object {
                          "id": "250",
                        },
                      },
                    ],
                    "pageInfo": Object {
                      "endCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                      "hasNextPage": false,
                      "hasPreviousPage": true,
                      "startCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                    },
                  },
                },
              },
            ],
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findMany",
          "args": Object {
            "include": Object {
              "posts": Object {
                "cursor": Object {
                  "createdAt": 2012-12-12T00:00:00.248Z,
                },
                "include": Object {
                  "comments": Object {
                    "include": Object {
                      "author": true,
                    },
                    "take": 3,
                  },
                },
                "orderBy": Object {
                  "createdAt": "asc",
                },
                "skip": 1,
                "take": 3,
              },
            },
            "skip": 0,
            "take": 2,
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
        Object {
          "action": "findUnique",
          "args": Object {
            "include": Object {
              "posts": Object {
                "include": Object {
                  "comments": Object {
                    "include": Object {
                      "author": true,
                    },
                    "take": 3,
                  },
                },
                "orderBy": Object {
                  "createdAt": "desc",
                },
                "skip": 0,
                "take": 3,
              },
            },
            "where": Object {
              "id": 1,
            },
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });

  it('multiple nested queries', async () => {
    const query = gql`
      query {
        userConnection(first: 1) {
          edges {
            cursor
            node {
              postsConnection(first: 2, after: "R1BDOkQ6MTM1NTI3MDQwMDI0OA==", oldestFirst: true) {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges {
                  cursor
                  node {
                    id
                    author {
                      profile {
                        bio
                      }
                    }
                  }
                }
              }
              newPosts: postsConnection(first: 2) {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges {
                  cursor
                  node {
                    id
                    author {
                      profile {
                        bio
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "userConnection": Object {
            "edges": Array [
              Object {
                "cursor": "R1BDOk46MQ==",
                "node": Object {
                  "newPosts": Object {
                    "edges": Array [
                      Object {
                        "cursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                        "node": Object {
                          "author": Object {
                            "profile": Object {
                              "bio": "Saepe deserunt animi quia.",
                            },
                          },
                          "id": "250",
                        },
                      },
                      Object {
                        "cursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OA==",
                        "node": Object {
                          "author": Object {
                            "profile": Object {
                              "bio": "Saepe deserunt animi quia.",
                            },
                          },
                          "id": "249",
                        },
                      },
                    ],
                    "pageInfo": Object {
                      "endCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OA==",
                      "hasNextPage": true,
                      "hasPreviousPage": false,
                      "startCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                    },
                  },
                  "postsConnection": Object {
                    "edges": Array [
                      Object {
                        "cursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                        "node": Object {
                          "author": Object {
                            "profile": Object {
                              "bio": "Saepe deserunt animi quia.",
                            },
                          },
                          "id": "250",
                        },
                      },
                    ],
                    "pageInfo": Object {
                      "endCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                      "hasNextPage": false,
                      "hasPreviousPage": true,
                      "startCursor": "R1BDOkQ6MTM1NTI3MDQwMDI0OQ==",
                    },
                  },
                },
              },
            ],
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findMany",
          "args": Object {
            "include": Object {
              "posts": Object {
                "cursor": Object {
                  "createdAt": 2012-12-12T00:00:00.248Z,
                },
                "include": Object {
                  "author": Object {
                    "include": Object {
                      "profile": true,
                    },
                  },
                  "comments": Object {
                    "include": Object {
                      "author": true,
                    },
                    "take": 3,
                  },
                },
                "orderBy": Object {
                  "createdAt": "asc",
                },
                "skip": 1,
                "take": 3,
              },
            },
            "skip": 0,
            "take": 2,
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
        Object {
          "action": "findUnique",
          "args": Object {
            "include": Object {
              "posts": Object {
                "include": Object {
                  "author": Object {
                    "include": Object {
                      "profile": true,
                    },
                  },
                  "comments": Object {
                    "include": Object {
                      "author": true,
                    },
                    "take": 3,
                  },
                },
                "orderBy": Object {
                  "createdAt": "desc",
                },
                "skip": 0,
                "take": 3,
              },
            },
            "where": Object {
              "id": 1,
            },
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });

  it('connection with errors', async () => {
    const query = gql`
      query {
        userConnectionWithErrors(first: 1) {
          __typename
          ... on Error {
            message
          }
          ... on QueryUserConnectionWithErrorsSuccess {
            data {
              edges {
                node {
                  profile {
                    bio
                    user {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "userConnectionWithErrors": Object {
            "__typename": "QueryUserConnectionWithErrorsSuccess",
            "data": Object {
              "edges": Array [
                Object {
                  "node": Object {
                    "profile": Object {
                      "bio": "Saepe deserunt animi quia.",
                      "user": Object {
                        "id": "VXNlcjox",
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findMany",
          "args": Object {
            "include": Object {
              "profile": Object {
                "include": Object {
                  "user": true,
                },
              },
            },
            "skip": 0,
            "take": 2,
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });

  it('connected relation with errors', async () => {
    const query = gql`
      query {
        me {
          postsConnectionWithErrors(first: 1) {
            __typename
            ... on Error {
              message
            }
            ... on UserPostsConnectionWithErrorsSuccess {
              data {
                edges {
                  node {
                    author {
                      profile {
                        bio
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "me": Object {
            "postsConnectionWithErrors": Object {
              "__typename": "UserPostsConnectionWithErrorsSuccess",
              "data": Object {
                "edges": Array [
                  Object {
                    "node": Object {
                      "author": Object {
                        "profile": Object {
                          "bio": "Saepe deserunt animi quia.",
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findUnique",
          "args": Object {
            "include": Object {
              "posts": Object {
                "include": Object {
                  "author": Object {
                    "include": Object {
                      "profile": true,
                    },
                  },
                  "comments": Object {
                    "include": Object {
                      "author": true,
                    },
                    "take": 3,
                  },
                },
                "skip": 0,
                "take": 2,
              },
            },
            "where": Object {
              "id": 1,
            },
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });

  it('connections with composite cursors', async () => {
    const query = gql`
      query {
        me {
          following(first: 3) {
            edges {
              cursor
              node {
                to {
                  id
                  name
                }
              }
            }
          }
          followingAfter: following(first: 3, after: "R1BDOko6WzEsMjFd") {
            edges {
              cursor
              node {
                to {
                  id
                  name
                }
              }
            }
          }
        }
      }
    `;

    const result = await execute({
      schema,
      document: query,
      contextValue: { user: { id: 1 } },
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "me": Object {
            "following": Object {
              "edges": Array [
                Object {
                  "cursor": "R1BDOko6WzEsMl0=",
                  "node": Object {
                    "to": Object {
                      "id": "VXNlcjoy",
                      "name": "Kyla Schoen",
                    },
                  },
                },
                Object {
                  "cursor": "R1BDOko6WzEsMjFd",
                  "node": Object {
                    "to": Object {
                      "id": "VXNlcjoyMQ==",
                      "name": "Eunice Ledner",
                    },
                  },
                },
                Object {
                  "cursor": "R1BDOko6WzEsMzBd",
                  "node": Object {
                    "to": Object {
                      "id": "VXNlcjozMA==",
                      "name": "Sydni Schmitt",
                    },
                  },
                },
              ],
            },
            "followingAfter": Object {
              "edges": Array [
                Object {
                  "cursor": "R1BDOko6WzEsMzBd",
                  "node": Object {
                    "to": Object {
                      "id": "VXNlcjozMA==",
                      "name": "Sydni Schmitt",
                    },
                  },
                },
                Object {
                  "cursor": "R1BDOko6WzEsMzld",
                  "node": Object {
                    "to": Object {
                      "id": "VXNlcjozOQ==",
                      "name": "Estefania Jacobs",
                    },
                  },
                },
                Object {
                  "cursor": "R1BDOko6WzEsNDNd",
                  "node": Object {
                    "to": Object {
                      "id": "VXNlcjo0Mw==",
                      "name": "Renee McGlynn",
                    },
                  },
                },
              ],
            },
          },
        },
      }
    `);

    expect(queries).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "findUnique",
          "args": Object {
            "include": Object {
              "following": Object {
                "include": Object {
                  "to": true,
                },
                "skip": 0,
                "take": 4,
              },
            },
            "where": Object {
              "id": 1,
            },
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
        Object {
          "action": "findUnique",
          "args": Object {
            "include": Object {
              "following": Object {
                "cursor": Object {
                  "compositeID": Object {
                    "fromId": 1,
                    "toId": 21,
                  },
                },
                "include": Object {
                  "to": true,
                },
                "skip": 1,
                "take": 4,
              },
            },
            "where": Object {
              "id": 1,
            },
          },
          "dataPath": Array [],
          "model": "User",
          "runInTransaction": false,
        },
      ]
    `);
  });
});
