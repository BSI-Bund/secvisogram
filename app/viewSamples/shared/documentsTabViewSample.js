const props = {
  defaultData: {
    advisories: [
      {
        advisoryId: '9690e3a3-614f-44be-8709-3aa8d58b6cb5',
        title: 'Cisco IPv6 Crafted Packet Denial of Service Vulnerability',
        owner: 'Mustermann',
        workflowState: 'Approved',
      },
    ],
  },
  onGetData() {},
  onDeleteAdvisory() {},
}

export default {
  basic: {
    props: {
      ...props,
    },
  },
  withoutData: {
    props: {
      ...props,
      defaultData: null,
    },
  },
}
