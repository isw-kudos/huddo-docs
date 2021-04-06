

### Error 500: SRVE0295E

If a user is unable to login to Huddo, especially after it working previously and they get an Error 500 there may be too many tokens in the OAuth table in Connections for them. To resolve this, check if this is the case by shorting the oh2p_cache table for 250 entries for the user.

    SELECT count(lookupkey) FROM homepage.oh2p_cache WHERE username ='<username>' AND clientid='<huddo_client_id>'

Clearing the oh2p cache allows the user to login again.

    DELETE from homepage.oh2p_cache where username='<username>' and clientid='<huddo_client_id>'

Please Note: You need to replace `<username>` and `<huddo_client_id>` with the correct values