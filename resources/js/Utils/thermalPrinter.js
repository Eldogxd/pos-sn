/**
 * Escapa caracteres especiales HTML para prevenir vulnerabilidades XSS (DOM-based XSS)
 * al inyectar cadenas en ventanas de impresión (document.write).
 *
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
    if (value === null || value === undefined) {
        return '';
    }
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Abre una ventana de impresión térmica de forma segura y escribe el contenido HTML.
 *
 * @param {string} htmlContent
 * @param {object} [options]
 * @param {number} [options.width=600]
 * @param {number} [options.height=600]
 * @returns {Window|null}
 */
export function openThermalPrintWindow(htmlContent, { width = 600, height = 600 } = {}) {
    const printWindow = window.open('', '_blank', `width=${width},height=${height}`);
    if (!printWindow) {
        return null;
    }
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    return printWindow;
}
