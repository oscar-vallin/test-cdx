# REPOSITORY GUIDELINES

## MASTER

Master will be the Branch that will be understood as the code in production. From this, urgent changes or bugfix can arise in production, as well as the main develop branch for a next release.

In each of the merges there must be a code review process in which at least two developers approve what the programmer in charge of the change did. Anyone on the team who sees a PR with two merges can perform the merge.

Issue stories must have the same name as the issue story.

- master
  - develop
  - hotfix

## DEVELOP

DEVELOP will have a structure in which two possibilities are divided: Bugfix and Features. When a BugFix is ​​performed, the branch is created directly from DEVELOP with the nomenclature of the issue story (e.g. CDX-0001); when a feature is made, a branch is created from develop with the nomenclature of the Feature name.
e.g.

- develop
  - feature-graphql
  - CDX-0002

Each of the feature's issue stories merge onto the feature's branch. When the feature is complete it would merge on the DEVELOP branch. For bugfixes, merge is performed directly on the DEVELOP branch.

## HOTFIX

When a case is presented in production that must be solved in particular, it must be developed in the Branch HotFix, which will be a production branch at that moment and from it different branches will come out to divide the hotfixes in question (eg CDX-0001) , when the Fix is ​​done, the merge is made to the HotFix branch and the DEVELOP branch.

- master
  - hotfix
    - CDX-0001
