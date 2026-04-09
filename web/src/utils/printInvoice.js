// ============================================================
// DOWNFLOW — Invoice Generator
// Opens a styled, printable invoice in a new tab.
// No external deps — pure DOM + CSS-in-HTML.
// ============================================================

export function printFundingInvoice({ request, tier, currency, wiseInfo, displayName, WISE_DETAILS }) {
  const ref = `${request.invoiceRef}-${(displayName || 'SPONSOR').replace(/\s+/g, '-').toUpperCase()}`
  const amount = request.amount ? `$${Number(request.amount).toLocaleString()} ${currency}` : '—'
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  const dueDate = new Date(Date.now() + 14 * 86400000).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })

  const bankRows = [
    wiseInfo.bankName      ? `<tr><td>Bank</td><td>${wiseInfo.bankName}</td></tr>` : '',
    wiseInfo.accountType   ? `<tr><td>Account type</td><td>${wiseInfo.accountType}</td></tr>` : '',
    wiseInfo.routingNumber ? `<tr><td>Routing number</td><td>${wiseInfo.routingNumber}</td></tr>` : '',
    wiseInfo.accountNumber ? `<tr><td>Account number</td><td>${wiseInfo.accountNumber}</td></tr>` : '',
    wiseInfo.iban          ? `<tr><td>IBAN</td><td>${wiseInfo.iban}</td></tr>` : '',
    wiseInfo.bic           ? `<tr><td>BIC / SWIFT</td><td>${wiseInfo.bic}</td></tr>` : '',
  ].filter(Boolean).join('\n')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DOWNFLOW Invoice — ${request.invoiceRef}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #fff; color: #1a1a2e; font-size: 14px; line-height: 1.5; }
    .page { max-width: 760px; margin: 0 auto; padding: 48px 40px; }

    /* ── Header ── */
    .inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 32px; border-bottom: 3px solid #0a0e1a; }
    .inv-logo { display: flex; align-items: center; gap: 12px; }
    .inv-logo-mark { width: 44px; height: 44px; background: #4de8b0; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
    .inv-logo-text { font-size: 22px; font-weight: 800; color: #0a0e1a; letter-spacing: -0.5px; }
    .inv-logo-sub { font-size: 11px; color: #6b7280; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }
    .inv-meta { text-align: right; }
    .inv-title { font-size: 32px; font-weight: 800; color: #0a0e1a; letter-spacing: -1px; }
    .inv-ref { font-size: 13px; color: #6b7280; margin-top: 4px; }
    .inv-ref strong { color: #4de8b0; }

    /* ── Parties ── */
    .inv-parties { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 36px; }
    .inv-party h4 { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 8px; }
    .inv-party p { font-size: 13.5px; color: #374151; line-height: 1.65; }
    .inv-party strong { color: #0a0e1a; font-weight: 700; }

    /* ── Status strip ── */
    .inv-status { display: flex; gap: 24px; padding: 16px 20px; background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 10px; margin-bottom: 36px; }
    .inv-status-item { display: flex; flex-direction: column; gap: 2px; }
    .inv-status-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; }
    .inv-status-value { font-size: 14px; font-weight: 700; color: #0a0e1a; }
    .inv-status-value.green { color: #059669; }
    .inv-status-value.amber { color: #d97706; }

    /* ── Line items ── */
    .inv-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    .inv-table thead th { padding: 10px 14px; background: #0a0e1a; color: rgba(255,255,255,0.7); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; text-align: left; }
    .inv-table thead th:last-child { text-align: right; }
    .inv-table tbody td { padding: 12px 14px; border-bottom: 1px solid #f3f4f6; font-size: 13.5px; color: #374151; vertical-align: top; }
    .inv-table tbody td:last-child { text-align: right; font-weight: 700; color: #0a0e1a; }
    .inv-table tbody tr:last-child td { border-bottom: none; }
    .item-desc { color: #6b7280; font-size: 12px; margin-top: 3px; }

    /* ── Totals ── */
    .inv-totals { margin-left: auto; width: 320px; margin-bottom: 36px; }
    .inv-total-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 13.5px; color: #374151; }
    .inv-total-row.total { border-bottom: none; border-top: 2px solid #0a0e1a; padding-top: 12px; margin-top: 4px; font-size: 17px; font-weight: 800; color: #0a0e1a; }
    .inv-total-row.rebate { color: #059669; font-size: 12.5px; }

    /* ── Bank details ── */
    .inv-bank { background: #f8fafc; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 20px 24px; margin-bottom: 28px; }
    .inv-bank h4 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 14px; }
    .inv-bank table { width: 100%; border-collapse: collapse; }
    .inv-bank table td { padding: 7px 0; font-size: 13px; color: #374151; border-bottom: 1px solid #f3f4f6; }
    .inv-bank table td:first-child { color: #9ca3af; font-weight: 500; width: 170px; }
    .inv-bank table td:last-child { font-weight: 600; color: #0a0e1a; }
    .inv-bank table tr.ref td:last-child { color: #4de8b0; font-size: 14px; font-weight: 800; }
    .inv-bank table tr:last-child td { border-bottom: none; }

    /* ── Note ── */
    .inv-note { padding: 14px 18px; background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 8px; font-size: 12px; color: #92400e; line-height: 1.6; margin-bottom: 36px; }

    /* ── Footer ── */
    .inv-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1.5px solid #e5e7eb; font-size: 11.5px; color: #9ca3af; }
    .inv-footer strong { color: #374151; }
    .inv-footer .tagline { font-style: italic; }

    /* ── Print ── */
    @media print {
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      .no-print { display: none; }
    }
    .print-btn { display: block; margin: 0 auto 32px; padding: 11px 28px; background: #4de8b0; color: #0a0e1a; font-weight: 700; font-size: 14px; border: none; border-radius: 8px; cursor: pointer; letter-spacing: 0.02em; }
    .print-btn:hover { background: #2dd4a0; }
  </style>
</head>
<body>
  <div class="page">

    <button class="print-btn no-print" onclick="window.print()">🖨 Print / Save as PDF</button>

    <!-- Header -->
    <div class="inv-header">
      <div class="inv-logo">
        <div class="inv-logo-mark">⬇</div>
        <div>
          <div class="inv-logo-text">DOWNFLOW</div>
          <div class="inv-logo-sub">School of Life</div>
        </div>
      </div>
      <div class="inv-meta">
        <div class="inv-title">INVOICE</div>
        <div class="inv-ref">Ref: <strong>${request.invoiceRef}</strong></div>
      </div>
    </div>

    <!-- Parties -->
    <div class="inv-parties">
      <div class="inv-party">
        <h4>From</h4>
        <p>
          <strong>DOWNFLOW School of Life</strong><br>
          ${WISE_DETAILS.accountName}<br>
          funding@downflow.app<br>
          downflow.app
        </p>
      </div>
      <div class="inv-party">
        <h4>Bill To</h4>
        <p>
          <strong>${request.sponsorName}</strong><br>
          ${request.sponsorEmail}<br>
          Region: ${request.region}
        </p>
      </div>
    </div>

    <!-- Status strip -->
    <div class="inv-status">
      <div class="inv-status-item">
        <span class="inv-status-label">Invoice date</span>
        <span class="inv-status-value">${date}</span>
      </div>
      <div class="inv-status-item">
        <span class="inv-status-label">Due by</span>
        <span class="inv-status-value amber">${dueDate}</span>
      </div>
      <div class="inv-status-item">
        <span class="inv-status-label">Status</span>
        <span class="inv-status-value amber">Awaiting Payment</span>
      </div>
      <div class="inv-status-item">
        <span class="inv-status-label">Currency</span>
        <span class="inv-status-value">${currency}</span>
      </div>
    </div>

    <!-- Line items -->
    <table class="inv-table">
      <thead>
        <tr>
          <th style="width:40px">#</th>
          <th>Description</th>
          <th style="width:90px">Qty</th>
          <th style="width:140px">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>
            <strong>${tier?.name || 'Custom Sponsorship'} — Learning Cell Funding</strong>
            <div class="item-desc">${tier?.period || 'Negotiated cycle'} · ${tier?.cells || 'TBD'} cell${tier?.cells > 1 ? 's' : ''} · ${tier?.students || 'TBD'} students · 24 sessions per cell</div>
          </td>
          <td>1</td>
          <td>${amount}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <strong>15% Reinvestment Rebate</strong>
            <div class="item-desc">9% → new cell seed fund · 6% → student coin wallets. Automatically allocated on cycle completion.</div>
          </td>
          <td>Included</td>
          <td style="color: #059669;">Included</td>
        </tr>
      </tbody>
    </table>

    <!-- Totals -->
    <div class="inv-totals">
      <div class="inv-total-row">
        <span>Subtotal</span>
        <span>${amount}</span>
      </div>
      <div class="inv-total-row rebate">
        <span>Rebate (reinvested — not a deduction)</span>
        <span>15% on completion</span>
      </div>
      <div class="inv-total-row total">
        <span>Total Due</span>
        <span>${amount}</span>
      </div>
    </div>

    <!-- Bank details -->
    <div class="inv-bank">
      <h4>💸 Payment Instructions — via Wise (${currency})</h4>
      <table>
        <tr><td>Account name</td><td>${WISE_DETAILS.accountName}</td></tr>
        ${bankRows}
        <tr class="ref"><td>Payment reference</td><td>${ref}</td></tr>
      </table>
    </div>

    <!-- Note -->
    <div class="inv-note">
      ⚠️ <strong>Important:</strong> ${WISE_DETAILS.note}
      Your cells will be activated within 24 hours of payment confirmation.
      Questions? Email us at <strong>funding@downflow.app</strong>
    </div>

    <!-- Footer -->
    <div class="inv-footer">
      <div>
        <strong>DOWNFLOW School of Life</strong> · downflow.app<br>
        Thank you for funding education.
      </div>
      <div class="tagline">"Learning that generates value — for everyone."</div>
    </div>

  </div>
</body>
</html>`

  const win = window.open('', '_blank')
  if (win) {
    win.document.write(html)
    win.document.close()
  }
}
