# Changesets

For changes that should ship in a new version of react-tabs, run `pnpm changeset`, choose `patch`, `minor`, or `major`, and write a short entry for the changelog. Commit the generated file with your pull request.

When changesets reach `main`, the release workflow opens or updates a release pull request. Review the version bump, changelog, and PR checks before merging. The resulting push to `main` publishes the new version to npm and creates a GitHub release.

The release workflow supplies the GitHub token for changelog links and contributor credits. Set `GITHUB_TOKEN` if you run `pnpm changeset version` locally.

The repository's Actions settings must allow GitHub Actions to create pull requests. A maintainer with write access can approve CI runs on the generated release pull request. Publishing uses npm trusted publishing, which must authorize `release.yml` for react-tabs.
