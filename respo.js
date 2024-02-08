export const createResponse = (status, message) => {
  return { state: status, data: typeof message === undefined ? null : message };
};

/*

General:
1 -> OK

User:

2 -> User Created
3 -> User Authorized
4 -> User not Authorized
5 -> User Updated

Team:
7 -> Team Created
8 -> Team Updated
9 -> Team Registered
10 -> Team Already Exists
11 -> Team Size Not Met
13 -> Team Invalid Main Quest Hint
14 -> Team Invalid Side Quest Hint

Other:
1 -> Data Sent
6 -> Default URL Entered
12 -> Data Deleted
15 -> Data Not Found
16 -> Internal Server Error

Not Assigned: 
*/
