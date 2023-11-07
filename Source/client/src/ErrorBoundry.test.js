import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from './ErrorBoundary';

/* In this test, we're using the shallow function from Enzyme to create
* a shallow rendering of the ErrorBoundary component. The first test checks
* that the component renders its children if there's no error, by verifying
* that the rendered output contains the child component.

The second test checks that the component renders an error message
* if there's an error, by calling the componentDidCatch method with
* a test error and an empty object. We then use the contains function to
* check that the rendered output contains the error message.
*/
describe('ErrorBoundary', () => {
  it('should render children if there is no error', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <div>Test</div>
      </ErrorBoundary>
    );
    expect(wrapper.contains(<div>Test</div>)).toEqual(true);
  });

  it('should render an error message if there is an error', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <div>Test</div>
      </ErrorBoundary>
    );
    wrapper.instance().componentDidCatch(new Error('Test error'), {});
    expect(wrapper.contains(<h1>Something went wrong.</h1>)).toEqual(true);
  });
});
