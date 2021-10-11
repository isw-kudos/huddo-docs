## Update URL in database

When the URL of the on-prem hosting environment changes, content stored in Huddo Boards will also need to be updated.

The below will change all URLs in the names, descriptions and links for each node. Replace both the 'domain' and 'newDomain' with your old and new URL. The domain variable is a regular expression (regex) that needs the initial `/` and trailing `/ig`; in place and any special characters escaped, such as in the example below.

    // show dbs
    // use kudos-boards-service OR boards-app

    domain = /dev-client2\.isw\.net\.au/ig
    newDomain = 'dev-client.isw.net.au'

Each 2 lines of code (nodeNames, nodeDesc & nodeLinks) updates one bit of a node and can be run independently of each other.

#### Update Node Names

    nodeNames = db.nodes.find({ name: { $regex: domain }}, { name: 1 }).toArray();
    nodeNames.forEach(n => db.nodes.updateOne({ _id: n._id }, { $set: { name: n.name.replace(domain, newDomain) }}) )

#### Update Node Descriptions

    nodeDesc = db.nodes.find({ description: { $regex: domain }}, { description: 1 }).toArray();
    nodeDesc.forEach(n => db.nodes.updateOne({ _id: n._id }, { $set: { description: n.description.replace(domain, newDomain) }}) )

#### Update Node Links

    nodeLinks = db.nodes.find({ 'links.url': { $regex: domain }}, { links: 1 }).toArray();
    nodeLinks.forEach(n => db.nodes.updateOne({ _id: n._id }, { $set: { links: n.links.map(link => { link.url = link.url.replace(domain, newDomain); return link; })}}) )