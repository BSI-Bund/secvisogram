const testsSample = {
  advisories: [
    {
      advisoryId: '9690e3a3-614f-44be-8709-3aa8d58b6cb5',
      workflowState: 'Approved',
      documentTrackingId: 'RHBA-2019_0024',
      title: 'Cisco IPv6 Crafted Packet Denial of Service Vulnerability',
      owner: 'Mustermann',
      changeable: true,
      deletable: false,
      allowedStateChanges: /** @type {const} */ ([
        'Review',
        'Approved',
        'Published',
        'Draft',
        'RfPublication',
      ]),
      revision: '1-1e6381e13c091b5b0b8b523ce3d412ba',
      csaf: { document: { title: 'my first document' } },
    },
    {
      advisoryId: 'aa7a0cf7-893a-4009-aa2f-27e3fdd9a6b0',
      workflowState: 'Published',
      documentTrackingId: 'RHBA-2019_0025',
      title: 'Cisco IPv4 Crafted Packet Denial of Service Vulnerability',
      owner: 'Mustermann',
      changeable: true,
      deletable: false,
      allowedStateChanges: /** @type {const} */ ([]),
      revision: '1-1e6381e13c091b5b0b8b523ce3d412ba',
      csaf: { document: { title: 'my first document' } },
    },
  ],
}

export default testsSample
