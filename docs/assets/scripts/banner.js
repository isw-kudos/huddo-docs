const banner = document.createElement('div');
banner.innerHTML = `
<img src="/assets/images/kudos-suite.png" />
<img src="/assets/images/huddo-logo-72.png" />
<h1>Kudos is becoming Huddo.</h1>
<div>
 We are in the process of transitioning our branding from Kudos to Huddo. You might see a mix of the two brands throughout the site as we update our content.
</div>
<style>
.huddo-banner {
  position: fixed;
  top: 120px;
  right: 0;
  font-size: 18px;
  width: 250px;
  z-index: 500;
}

.huddo-banner img {
  margin: 5px 10px;
  height: 50px;
}

.huddo-banner h1 {
  font-size: 22px;
}

.huddo-banner div {
  padding: 5px;
}

@media (max-width: 1920px) {
  .huddo-banner {
    top: initial;
    bottom: 0;
  }
}

@media (max-width: 960px) {
  .huddo-banner {
    display: none;
  }
}
</style>
`;

banner.className = 'huddo-banner';
document.body.appendChild(banner);
