// app/api-docs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import './custom-swagger-ui.css';

const ApiDocsPage : React.FC = () => {
    const [spec, setSpec] = useState(null);

    useEffect(() => {
        const fetchSpec = async () => {
            const response = await fetch('/api/openapi');
            const specData = await response.json();
            setSpec(specData);
        };

        fetchSpec();
    }, []);

    if (!spec) return <div>Loading...</div>;

    return <SwaggerUI spec={ spec } />;
};

export default ApiDocsPage;
