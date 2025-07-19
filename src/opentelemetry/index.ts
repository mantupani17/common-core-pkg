import { NodeSDK } from '@opentelemetry/sdk-node';
import { detectResources, envDetector, processDetector, resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OpenTelemetryConfigDto } from './request.dto';

export async function setupOpenTelemetry(config: OpenTelemetryConfigDto) {
  const detectedResource = await detectResources({
    detectors: [envDetector, processDetector],
  });


    const resource = resourceFromAttributes({
        [ATTR_SERVICE_NAME]: config.appName,
        [ATTR_SERVICE_VERSION]: config.appVersion,
        'deployment.environment': config.deplomentEnv,
    });


  const mergedResource = detectedResource.merge(resource) ;


  const traceExporter = new OTLPTraceExporter({
    url: config.traceUrl,
  });

  const prometheusExporter = new PrometheusExporter({
    port: 9464,
    endpoint: '/metrics', // Optional
  });

  const sdk = new NodeSDK({
    resource: mergedResource,
    traceExporter,
    metricReader: prometheusExporter,
    instrumentations: [getNodeAutoInstrumentations()],
  });

//   await sdk.start();
  console.log('✅ OpenTelemetry started at http://localhost:9464/metrics');

  return sdk
}
