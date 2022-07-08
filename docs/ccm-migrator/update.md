# Update

## Update Licence

After receiving your new key, you will need to update the `name space bindings`
for CMM Migrator using the _exact_ values provided by the Huddo team.
_Please ensure you use the exact case and spelling for the name space bindings as stated below._<br>
All licenced installs require `iswCCMLicenceKey`.<br>
Limited licences also require `iswCCMLicenceCommunities`.

| Binding identifier +<br> Name in name space... | String value |
|------------------------------------------------|--------------|
| `iswCCMLicenceKey`                             | Licence key string<br>e.g. `A+gAAACsrdTGobh6+PNOTAREALKEYjpVT/6AgMY4SxyOM2ZQ` |
| `iswCCMLicenceCommunities` { nowrap }          | Comma delimited list of community ids without white space<br>e.g. `4f4847e3-fdda-4da4-a1b7-2829111a694b,4f4847e3-fdda-4da4-a1b7-2829111a694c,4f4847e3-fdda-4da4-a1b7-2829111a694d` |

You may follow the steps below for how to update name space bindings.

In the ISC, navigate to Environment \ Naming \ Name space bindings.

![Name-space binding - step 1](/assets/ccm-migrator/namespace-binding01.png)

Select the `iswCCMLicenceKey` binding.

![Name-space binding - step 2](/assets/ccm-migrator/namespace-binding05.png)

Update the "String" with the new value, then click "OK".

![Name-space binding - step 3](/assets/ccm-migrator/namespace-binding06.png)

Then save the master configuration. Repeat these steps for `iswCCMLicenceCommunities` if this also needs to be updated.