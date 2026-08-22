const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const pageStyle = 'width:794px;height:1123px;margin:0;padding:0;background:#FFF8E7;overflow:hidden;';
const pdfRootStyle = 'width:794px;height:1123px;padding:32px;background:#FFF8E7;color:#4A0612;font-family:Georgia,Times,serif;-webkit-print-color-adjust:exact;print-color-adjust:exact;overflow:hidden;box-sizing:border-box;';
const sheetStyle = 'height:100%;border:2px solid #B8922E;border-radius:24px;background:#ffffff;padding:36px;overflow:hidden;box-sizing:border-box;position:relative;';

const labelStyle = 'margin:0;color:#B8922E;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.25em;text-transform:uppercase;';
const valueStyle = 'margin:6px 0 0;font-family:Georgia,serif;font-size:16px;font-weight:700;line-height:1.35;color:#4A0612;word-break:break-word;';
const noteStyle = 'margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;color:#6d7f95;font-size:10px;line-height:1.45;word-break:break-word;';

export const buildEnquiryPdfHtml = ({
  fullName,
  phone,
  email,
  functionType,
  guestCount,
  programDate,
  programLocation,
  specialRequirements,
  notes,
}) => {
  const submittedAt = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedProgDate = formatDate(programDate);

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="${pageStyle}">
        <div style="${pdfRootStyle}">
          <main style="${sheetStyle}">
            <table style="width:100%;height:100%;border-collapse:collapse;table-layout:fixed;">
              <tr>
                <td colspan="2" style="padding:0 0 20px 0;border-bottom:2px solid #B8922E;vertical-align:top;height:120px;">
                  <table style="width:100%;border-collapse:collapse;">
                    <tr>
                      <td style="vertical-align:middle;padding-right:16px;">
                        <p style="margin:0;color:#B8922E;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;letter-spacing:0.35em;text-transform:uppercase;">Swamy's Mess & Catering</p>
                        <h1 style="margin:8px 0 4px;font-family:Georgia,serif;font-size:30px;line-height:1.1;color:#4A0612;font-weight:900;">CATERING ENQUIRY</h1>
                        <p style="margin:0;color:#64748b;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;">Traditional South Indian hospitality and premium culinary services.</p>
                      </td>
                      <td style="width:180px;vertical-align:middle;text-align:right;">
                        <div style="border-radius:12px;background:#FFF8E7;padding:12px;text-align:center;border:1px solid #B8922E;">
                          <p style="${labelStyle};text-align:center;">Status</p>
                          <p style="margin:4px 0 0;color:#4A0612;font-family:Georgia,serif;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;">Received</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td colspan="2" style="padding:24px 0 0 0;vertical-align:top;">
                  <h3 style="margin:0 0 12px 6px;font-family:Georgia,serif;font-size:14px;font-weight:800;color:#4A0612;text-transform:uppercase;letter-spacing:0.12em;">Event Details</h3>
                  <table style="width:100%;border-collapse:separate;border-spacing:8px;table-layout:fixed;margin-top:-8px;">
                    <tr>
                      <td style="width:50%;vertical-align:top;">
                        <div style="border-radius:14px;background:#FFF8E7;padding:14px;border:1px solid rgba(184,146,46,0.25);min-height:85px;box-sizing:border-box;">
                          <p style="${labelStyle}">Function Type</p>
                          <p style="${valueStyle}">${escapeHtml(functionType)}</p>
                        </div>
                      </td>
                      <td style="width:50%;vertical-align:top;">
                        <div style="border-radius:14px;background:#FFF8E7;padding:14px;border:1px solid rgba(184,146,46,0.25);min-height:85px;box-sizing:border-box;">
                          <p style="${labelStyle}">Number of Guests</p>
                          <p style="${valueStyle}">${escapeHtml(guestCount)}</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:50%;vertical-align:top;">
                        <div style="border-radius:14px;background:#FFF8E7;padding:14px;border:1px solid rgba(184,146,46,0.25);min-height:85px;box-sizing:border-box;">
                          <p style="${labelStyle}">Program Date</p>
                          <p style="${valueStyle}">${escapeHtml(formattedProgDate)}</p>
                        </div>
                      </td>
                      <td style="width:50%;vertical-align:top;">
                        <div style="border-radius:14px;background:#FFF8E7;padding:14px;border:1px solid rgba(184,146,46,0.25);min-height:85px;box-sizing:border-box;">
                          <p style="${labelStyle}">Program Location</p>
                          <p style="margin:5px 0 0;font-family:Georgia,serif;font-size:13px;font-weight:700;color:#4A0612;line-height:1.45;word-break:break-word;">${escapeHtml(programLocation)}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td colspan="2" style="padding:16px 0 0 0;vertical-align:top;">
                  <h3 style="margin:0 0 12px 6px;font-family:Georgia,serif;font-size:14px;font-weight:800;color:#4A0612;text-transform:uppercase;letter-spacing:0.12em;">Customer Details</h3>
                  <div style="border:1px solid rgba(184,146,46,0.25);border-radius:14px;padding:16px;background:#FFF8E7;margin:0 8px;">
                    <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
                      <tr>
                        <td style="width:33.3%;vertical-align:top;padding-right:10px;box-sizing:border-box;">
                          <p style="${labelStyle}">Name</p>
                          <p style="margin:5px 0 0;font-family:Georgia,serif;font-size:13px;font-weight:700;color:#4A0612;word-break:break-word;">${escapeHtml(fullName)}</p>
                        </td>
                        <td style="width:33.3%;vertical-align:top;padding-right:10px;padding-left:15px;border-left:1px solid rgba(184,146,46,0.2);box-sizing:border-box;">
                          <p style="${labelStyle}">Phone</p>
                          <p style="margin:5px 0 0;font-family:Georgia,serif;font-size:13px;font-weight:700;color:#4A0612;">${escapeHtml(phone)}</p>
                        </td>
                        <td style="width:33.3%;vertical-align:top;padding-left:15px;border-left:1px solid rgba(184,146,46,0.2);box-sizing:border-box;">
                          <p style="${labelStyle}">Email</p>
                          <p style="margin:5px 0 0;font-family:Georgia,serif;font-size:13px;font-weight:700;color:#4A0612;word-break:break-all;">${escapeHtml(email)}</p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>

              <tr>
                <td colspan="2" style="padding:16px 0 0 0;vertical-align:top;">
                  <h3 style="margin:0 0 12px 6px;font-family:Georgia,serif;font-size:14px;font-weight:800;color:#4A0612;text-transform:uppercase;letter-spacing:0.12em;">Requirements</h3>
                  <table style="width:100%;border-collapse:separate;border-spacing:8px;table-layout:fixed;margin-top:-8px;">
                    <tr>
                      <td style="width:50%;vertical-align:top;">
                        <div style="border-radius:14px;background:#FFF8E7;border:1px solid rgba(184,146,46,0.25);padding:14px;min-height:140px;box-sizing:border-box;">
                          <p style="${labelStyle}">Special Requirements</p>
                          <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;color:#4A0612;font-size:12px;line-height:1.5;white-space:pre-wrap;word-break:break-word;font-weight:normal;">${escapeHtml(specialRequirements || 'No special requirements specified.')}</p>
                        </div>
                      </td>
                      <td style="width:50%;vertical-align:top;">
                        <div style="border-radius:14px;background:#FFF8E7;border:1px solid rgba(184,146,46,0.25);padding:14px;min-height:140px;box-sizing:border-box;">
                          <p style="${labelStyle}">Additional Message</p>
                          <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;color:#4A0612;font-size:12px;line-height:1.5;white-space:pre-wrap;word-break:break-word;font-weight:normal;">${escapeHtml(notes || 'No additional message.')}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td colspan="2" style="padding-top:16px;vertical-align:bottom;height:60px;">
                  <table style="width:100%;border-collapse:collapse;border-top:2px solid #B8922E;padding-top:12px;">
                    <tr>
                      <td style="font-family:Georgia,serif;font-size:12px;line-height:1.5;color:#4A0612;font-style:italic;font-weight:bold;">Thank you for choosing Swamy's Mess & Catering.</td>
                      <td style="text-align:right;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:1.5;color:#B8922E;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;">Submitted At: ${submittedAt}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </main>
        </div>
      </body>
    </html>
  `;
};
