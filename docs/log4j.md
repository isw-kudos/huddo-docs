Recently a severe vulnerability was discovered in the log4j package. Details of that [are here](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228) and Apache mitigation/patching details [are here](https://logging.apache.org/log4j/2.x/security.html).

The status of the Huddo Applications in regard to the vulnerability are below.

## Badges
Badges does not use log4j directly. It does contain commons-logging which uses the underlying logging service in WAS.

## Analytics
Analytics does not use log4j directly. It does contain commons-logging which uses the underlying logging service in WAS.

## Boards WebSphere
Boards WebSphere does not use log4j directly. It does contain commons-logging which uses the underlying logging service in WAS.

## Boards Docker/Component Pack
Boards Docker does not contain any Java and as such is not affected by this vulnerability.

## Boards Cloud
Boards Cloud does not contain any Java and as such is not affected by this vulnerability.

## CCM Migrator
CCM Migrator does not use log4j directly. It does contain commons-logging which uses the underlying logging service in WAS.