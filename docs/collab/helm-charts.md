# Helm Chart History

Release notes for each Helm chart utilised by Huddo Collab

## For Component Pack

### huddo-collab-cp

- [0.6.3](../assets/collab/helm/huddo-collab-cp-0.6.3.tgz)

#### Upgrade command

```bash
helm upgrade huddo-collab-cp https://docs.huddo.com/assets/collab/helm/huddo-collab-cp-0.6.3.tgz -i -f ./collab-cp.yaml --namespace connections
```

!!! note

    Collab images are not date-tagged, so Helm will not detect an image change on upgrade. Restart the deployments to pull the latest images:

        kubectl rollout restart deployment -n connections -l release=huddo-collab-cp
