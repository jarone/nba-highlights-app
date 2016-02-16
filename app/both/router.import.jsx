import MainLayout from 'both/components/MainLayout'
import MatchSelector from 'both/components/MatchSelector'

FlowRouter.route('/', {
    action() {
        ReactLayout.render(MainLayout, {
            content: <MatchSelector />

        })
    }
});
