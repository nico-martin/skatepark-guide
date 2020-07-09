import React, { useEffect, useState } from 'react';

import './Loader.css';

const Loader = ({ className = '' }: { className?: string }) => (
  <div className={`${className} loader`} />
);

export default Loader;
