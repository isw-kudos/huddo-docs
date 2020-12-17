const banner = document.createElement('div');
banner.innerHTML = `
<img src="/assets/images/kudos-suite.png" />
<img src="/assets/images/huddo-logo-72.png" />
<h1>Kudos is becoming Huddo.</h1>
<div>
 We are in the process of transitioning our branding from Kudos to Huddo. You might see a mix of the two brands throughout the site as we update our content.
</div>
`;

banner.className = 'huddo-banner';
document.body.appendChild(banner);
