# URL Update

## Update content URLs in database

When the URL of the on-prem hosting environment changes, content stored in Huddo Boards may also need to be updated.

The below will change all URLs in the names, descriptions and links for each node (card/board/comment). Replace both the `domain` and `newDomain` with your old and new URLs. The domain variable is a regular expression (regex) that needs the initial `/` and trailing `/ig`; in place and any special characters escaped with `\`, such as in the example below.

Connect to the Mongo DB hosting the Boards database and run the following in the mongo shell

    show dbs
    // select to the boards database (name is different for CP)
    use kudos-boards-service OR boards-app

    domain = /host\.example\.com/ig
    newDomain = 'host.company.com'

Each 2 lines of code (nodeNames, nodeDesc & nodeLinks) updates one bit of a node and can be run independently of each other.

### Node Names

    nodeNames = db.nodes.find({ name: { $regex: domain }}, { name: 1 }).toArray();
    nodeNames.forEach(n => db.nodes.updateOne({ _id: n._id }, { $set: { name: n.name.replace(domain, newDomain) }}) )

### Node Descriptions

    nodeDesc = db.nodes.find({ description: { $regex: domain }}, { description: 1 }).toArray();
    nodeDesc.forEach(n => db.nodes.updateOne({ _id: n._id }, { $set: { description: n.description.replace(domain, newDomain) }}) )

### Node Links

    nodeLinks = db.nodes.find({ 'links.url': { $regex: domain }}, { links: 1 }).toArray();
    nodeLinks.forEach(n => db.nodes.updateOne({ _id: n._id }, { $set: { links: n.links.map(link => { link.url = link.url.replace(domain, newDomain); return link; })}}) )
