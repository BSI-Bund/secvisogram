# Version - Usage

The version of the present document.

The version may still contain pre-release information (e.g. 1.0.0-17) or build metadata for documents in `draft` status.
For documents in `interim` or `final` status no pre-release information may be included.

The set value must be the same as the `number` of the revision item with the most recent `date` value.
For this comparison build metadata is ignored.
If the document status is `draft` any pre-release part is also ignored.

In general, a distinction is made between integer versioning and semantic versioning.
With integer versioning a version number is incremented.
With semantic versioning the version number has the form `MAJOR.MINOR.PATCH` and the individual parts are incremented under certain conditions.
Whenever the operator makes a new run through his asset database (matching with deployed products) that result in changes the `MAJOR` version is incremented.
For minor changes such as correcting typos, the `PATCH` version is incremented.
All changes in between trigger an increase of the `MINOR` version.
The exact rules are defined in section 3.1.11.2 of the specification.
