# Progressive Web App Starter

Playing around with Progressive Web Apps.

Currently this receives 99/100 on [Lighthouse](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwilmdackbHTAhXCFZQKHWhUDSUQFgglMAA&url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Flighthouse%2Fblipmdconlkpinefehnmjammfjpmpbjk%3Fhl%3Den&usg=AFQjCNFvomjeSTNsyil51bzJfvzQWOp_lA&sig2=lNQTR3X9e_qqX7tYfwCMVQ).

I was using MAMP Pro to test it with SSL, created a self signed cert and hosted the page at https://pwa.localhost. The test requires a redirect from HTTP to HTTPS and MAMP does not listen on both ports. I created a site with a duplicate name with SSL unchecked (which shows a warning in MAMP, but works) and added some redirect code on the HTTP one:

```
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}
```

Page includes [React Material UI](http://www.material-ui.com/#/) for some quick markup.

Tech:

* React
* Redux
* React Router V4
* Webpack

TODO:

* Lazy Loading Routes (RR V4)
* API Requests with data storage and offline fallback
