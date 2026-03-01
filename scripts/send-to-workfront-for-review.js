const FUSION_WEBHOOK_URL = 'https://hook.app.workfrontfusion.com/jj0x0bob52cs93e77fjcqxszqs79y50r';

const triggerFusionWebhook = async (event) => {
  // 1. Get the path from the event detail
  const resourcePath = event.detail; 
  
  // 2. Grab the sidekick element to access its internal state
  const sk = document.querySelector('aem-sidekick');
  
  // Safely extract status and config (fallback to empty objects if undefined)
  const status = sk?.status || {};
  const config = sk?.config || {};

  // 3. Construct an enriched payload
  const webhookPayload = {
    // Basic Info
    resourcePath: resourcePath,
    documentUrl: window.location.href,
    documentTitle: document.title,
    timestamp: new Date().toISOString(),

    // Admin API Status Data
    previewUrl: status.preview?.url || '',
    previewLastModified: status.preview?.lastModified || '',
    liveUrl: status.live?.url || '',
    liveLastModified: status.live?.lastModified || '',
    sourceLastModified: status.edit?.lastModified || '',
    
    // Explicit Source URL from AEM (often cleaner than window.location)
    sourceDocumentUrl: status.edit?.url || '',

    // Project & Environment Config Data
    projectName: config.project || 'Unknown Project',
    gitOwner: config.owner || '',
    gitRepo: config.repo || '',
    gitBranch: config.ref || 'main',
    
    // Environment context (e.g., was preview clicked from 'edit' or 'dev'?)
    environment: sk?.getAttribute('environment') || 'unknown'
  };

  try {
    const response = await fetch(FUSION_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (response.ok) {
      console.log('Successfully called Fusion webhook.', webhookPayload);
    } else {
      console.error('Failed to call Fusion webhook. Status:', response.status);
    }
  } catch (error) {
    console.error('Error calling Fusion webhook:', error);
  }
};

// Hook into the AEM Sidekick lifecycle
const initWebhook = () => {
  const sk = document.querySelector('aem-sidekick');
  if (sk) {
    sk.addEventListener('previewed', triggerFusionWebhook);
  } else {
    document.addEventListener('sidekick-ready', () => {
      document.querySelector('aem-sidekick').addEventListener('previewed', triggerFusionWebhook);
    }, { once: true });
  }
};

initWebhook();
