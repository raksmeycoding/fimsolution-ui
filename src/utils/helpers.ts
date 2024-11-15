export function formatDate(date: Date | string | null, includeTime: boolean = false): string {
    if (!date) {
        return 'Invalid date';
    }

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
        return 'Invalid date';
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',    // e.g., 'November'
        day: 'numeric',   // e.g., '12'
    };

    // Include time if needed
    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';   // Optionally include seconds
        options.hour12 = true;  // Use 12-hour format (AM/PM)
    }

    // Format date with time if requested
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}
