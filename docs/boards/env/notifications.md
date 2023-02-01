
The notifications sent out from Huddo Boards can be customised to include company logos, links and support email addresses. 
The custom values are set as ENV variables in the config file.


The image below shows the items that can be customised within notifications:
![Customisable values](/assets/boards/notification-config.png)


### App Logo
Specify a URL to point to a hosted logo image by specifying `events.env.APP_LOGO_URL` in the config. 
For example: `https://company.com/assets/logo.png`


Note that an inline base64 encoded data URL can also be used for this variable.

### Brand Logo
Specify a URL to point to a hosted logo image by specifying `events.env.BRAND_LOGO_URL` in the config. 
For example: `https://company.com/assets/logo.png`

Note that an inline base64 encoded data URL can also be used for this variable.

### Social Links
The links below the brand logo can be customised. These do not necessarily need to be displayed as images/icons and can be text based links.

Specify the social links using the `events.env.SOCIAL_LINKS` variable. The links are specified in an array of objects with the format:
```json
 {
  name: "Link Name/Text", 
  link: "Link URL", 
  icon: "(Optional) Hosted Icon URL or data URL"
}
```

e.g.:
```json
"[{\"name\": \"Intranet\",\"link\":\"https://company.com/intranet/\"}, 
  { \"name\": \"Support\", \"link\": \"https://company.com/support\", 
    \"icon\": \"https://company.com/assets/support_icon.png\"}]"
``` 

### App Name
Use `events.env.APP_NAME` to specify the app name.

### Support Email
The support email address can be specified in `events.env.NOTIFIER_EMAIL_SUPPORT_EMAIL`
