# Huddo Analytics Installation FAQ

### Installation

#### Images do not work
Please go to the BadgesConfigurator->Settings tab then restart the Huddo Application.

#### Scheduler not running
Issue is with the timerManager in WAS. [Create a new one to resolve issue](https://www.ibm.com/support/knowledgecenter/en/SSEQTP_9.0.0/com.ibm.websphere.base.doc/asyncbns/tasks/tasb_timemanager.html).

#### Performance tuning
Review [this guide](../Huddo%20Analytics%20Tuning.pdf) for changes that can be made.

### Connections 8 UI
The new UI that comes with Connections 8 breaks some CSS of Analytics. Please use the below to fix it up, which can be applied as per the [HCL Docs](https://opensource.hcltechsw.com/connections-doc/v8-cr1/admin/customize/).t_admin_navbar_change_style.html)

    .ConnectionsRankDropDown {
        border: 1px solid !important;
    }

    .KudosAnalyticsOptionSelect {
        border: 1px solid !important;
    }

    .AnalyticsCategoryList li div {
        font-size: 10px !important;
    }

    .KudosAnalyticsField .dijitReset.dijitInputField.dijitArrowButtonInner {
        width: 16px !important;
    }