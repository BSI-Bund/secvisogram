# Version - Usage

* The set value must be the same as the `number` of the revision item with the most recent `date` value.
  For this comparison build metadata is ignored. If the document status is `draft` any pre-release part is also ignored.

* If the version is `0` or `0.y.z` or contains the pre-release part, `/document/tracking/status` must be set to `draft`.

* If the document status is `final` or `interim` the version must not contain a pre-release part.
