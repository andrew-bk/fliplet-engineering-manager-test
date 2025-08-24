# AWS Debugging Task
## 🔍 Problem
Error during Postgres upgrade.

## 🛠️ Resolution Plan

I'm assuming that this error is occuring in production.

If this error prevents PostgreSQL from starting from up, then Aurora should automatically rollback the upgrade and we should hopefully then have v13 of PostgreSQL startup successfully and this would restore the service for our users. We would have to look at the logs and try to replicate the issue in a different environment.  If the database has started up successfully we would have to downgrade it manually or restore from a backup so that we can restore the service that way.

Presumably we did not have this error in the test environment otherwise we would not have released the upgrade. I would check what version of the extension is installed in the upgraded test environment to see if there is a difference. I would also check if there is a difference in the PostgreSQL versions between the two environments. The major version might be the same but there could be minor or patch version differences between the two environments that meant the error did not appear when we tested the upgrade but does during the upgrade.

We will eventually have to reproduce the problem in a test environment and test upgrading the extension to a compatible version and then attempt the upgrade.
