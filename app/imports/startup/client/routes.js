import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { MainLayout } from '/imports/ui/layout/MainLayout';
import { MatchSelectorContainer } from '/imports/ui/components/MatchSelectorContainer';

FlowRouter.route('/', {
    action() {
      mount(MainLayout, {
        content: <MatchSelectorContainer/>
      });
    }
});
