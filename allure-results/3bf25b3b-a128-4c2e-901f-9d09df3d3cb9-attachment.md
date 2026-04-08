# Page snapshot

```yaml
- generic [ref=e6]:
  - img [ref=e8]
  - generic [ref=e9]:
    - img [ref=e11]
    - generic [ref=e12]:
      - generic [ref=e14]:
        - heading "Welcome to Blubirch" [level=1] [ref=e16]
        - generic [ref=e17]:
          - generic [ref=e19]: Email ID or Phone Number or User ID
          - textbox "Enter email ID/phone number/User ID" [ref=e24]: dava_admin
          - generic [ref=e25]:
            - generic [ref=e27]: Password
            - link "Forgot Password?" [ref=e29] [cursor=pointer]:
              - /url: "#"
          - generic [ref=e32]:
            - textbox "Enter Password" [ref=e34]
            - button "appended action" [ref=e36] [cursor=pointer]: 󰈉
          - button "Login" [ref=e38] [cursor=pointer]:
            - generic [ref=e39]: Login
      - button "󰀲" [ref=e42] [cursor=pointer]
```