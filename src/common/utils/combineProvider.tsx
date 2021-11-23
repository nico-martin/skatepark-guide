import React from 'react';

const combineProvider = (...components: Array<any>): any => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <React.Fragment>{children}</React.Fragment>
  );
};

export default combineProvider;
