import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { MainLayout } from '/imports/ui/layout/MainLayout';
import { AppContainer } from '/imports/ui/components/AppContainer';

FlowRouter.route('/', {
    action() {
      mount(MainLayout, {
        content: <AppContainer/>
      });
    }
});
