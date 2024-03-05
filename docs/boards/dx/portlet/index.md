# Boards Portlet

## Overview

The steps below install the Boards Portlet as an application in DX.

![outcome](./outcome.png)

![boards-for-page](./boards-for-page.png)

## Steps

To install the Huddo Boards portlet, follow these steps:

### Install

1. Download the [Boards Portlet WAR file](./boards-portlets.war)

1. Open the DX `Administration` => `Web Modules`. Select the war file and click `Next`

    ![select war](./web-modules-browse.png)

1. Click `Finish` to complete the installation

    ![click finish](./web-modules-finish.png)

### ACL

1. Find the newly installed `Boards` portlet, click `Assign access to Web module`

    ![assign access](./assign-access.png)

1. Click `User` => `Edit Role`

    ![edit role](./edit-role.png)

1. Click `Add`

    ![add role](./add-role.png)

1. Check `All Authenticated Portal Users` and click `OK`

    ![all authenticated users](./all-authenticated-users.png)

### Configure

1. Open the `Portlets` page, find Huddo Boards, click `Configure Portlet`

    ![configure portlet](./manage.png)

1. Edit the cfg.BaseURL to `https://<BOARDS_URL>`.

    For example:

    - `https://boards.company.com` or
    - `https://company.example.com/boards`
    - `https://boards.huddo.com` (hybrid customers)

    ![edit base url](./configure.png)

    Click `OK`

1. The `Huddo Boards` Portlet should now be accessible at

    `Edit mode` => `Add` => `Applications`

    ![applications](./applications.png)

1. Add it to any page to get started!

    ![widget-settings](./widget-settings.png)
