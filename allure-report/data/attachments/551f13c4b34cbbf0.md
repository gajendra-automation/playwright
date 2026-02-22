# Page snapshot

```yaml
- generic [ref=e6]:
  - img [ref=e9]
  - generic [ref=e10]:
    - img [ref=e12]
    - generic [ref=e13]:
      - generic [ref=e15]:
        - heading "Welcome to Blubirch" [level=1] [ref=e17]:
          - text: Welcome to
          - generic [ref=e18]: Blubirch
        - generic [ref=e19]:
          - generic [ref=e21]: Email ID or Phone Number or User ID
          - generic [ref=e22]:
            - textbox "Enter email ID/phone number/User ID" [ref=e26]
            - alert [ref=e27]
          - generic [ref=e29]:
            - generic [ref=e31]: Password
            - link "Forgot Password?" [ref=e33] [cursor=pointer]:
              - /url: "#"
          - generic [ref=e34]:
            - generic [ref=e36]:
              - textbox "Enter Password" [ref=e38]
              - button "appended action" [ref=e40] [cursor=pointer]: 󰈉
            - alert [ref=e41]
          - button "Login" [ref=e44] [cursor=pointer]:
            - generic [ref=e45] [cursor=pointer]: Login
      - button "󰀲" [ref=e48] [cursor=pointer]
```