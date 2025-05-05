/**
 * Railway Booking System - Customer Dashboard JavaScript
 * Handles customer dashboard functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Handle sidebar toggling
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-expanded');
            content.classList.toggle('content-expanded');
        });
    }

    // Section navigation
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update section title
            const sectionTitle = document.querySelector('.section-title');
            sectionTitle.textContent = this.textContent.trim();
            
            // Remove active class from all nav links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked nav link
            this.classList.add('active');
            
            // Hide all sections
            const sections = document.querySelectorAll('.dashboard-section');
            sections.forEach(section => {
                section.classList.remove('active-section');
            });
            
            // Show the selected section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active-section');
            
            // If on mobile, close the sidebar after selection
            if (window.innerWidth < 992) {
                sidebar.classList.remove('sidebar-expanded');
            }
        });
    });

    // Book Ticket Form Handling
    const bookTicketForm = document.getElementById('bookTicketForm');
    if (bookTicketForm) {
        bookTicketForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const passengerName = document.getElementById('passengerName').value.trim();
            const passengerMobile = document.getElementById('passengerMobile').value.trim();
            const passengerAge = document.getElementById('passengerAge').value.trim();
            const journeyDate = document.getElementById('journeyDate').value;
            const boardingStation = document.getElementById('boardingStation').value;
            const destinationStation = document.getElementById('destinationStation').value;
            const ticketCategory = document.getElementById('ticketCategory').value;
            const ticketCount = document.getElementById('ticketCount').value;
            const availableTrains = document.getElementById('availableTrains').value;
            
            // Simple validation
            if (!passengerName || !passengerMobile || !passengerAge || !journeyDate || 
                !boardingStation || !destinationStation || !ticketCategory || !ticketCount || !availableTrains) {
                alert('Please fill in all fields');
                return;
            }
            
            // Check if boarding and destination stations are the same
            if (boardingStation === destinationStation) {
                alert('Boarding and destination stations cannot be the same');
                return;
            }
            
            // Update booking confirmation modal with values
            document.getElementById('confirmBookingId').textContent = 'TKT' + Math.floor(10000 + Math.random() * 90000);
            document.getElementById('confirmTrainId').textContent = availableTrains;
            document.getElementById('confirmBoardingStation').textContent = boardingStation;
            document.getElementById('confirmDestinationStation').textContent = destinationStation;
            document.getElementById('confirmJourneyDate').textContent = journeyDate;
            document.getElementById('confirmTicketCount').textContent = ticketCount;
            
            // Show booking confirmation modal
            const bookingConfirmationModal = new bootstrap.Modal(document.getElementById('bookingConfirmationModal'));
            bookingConfirmationModal.show();
            
            // Reset form
            bookTicketForm.reset();
            
            // Set ID value again since it was reset
            document.getElementById('ticketId').value = 'USER123';
        });
    }

    // Handle View Tickets button in booking confirmation modal
    const viewTicketsBtn = document.getElementById('viewTicketsBtn');
    if (viewTicketsBtn) {
        viewTicketsBtn.addEventListener('click', function() {
            // Hide the booking confirmation modal
            bootstrap.Modal.getInstance(document.getElementById('bookingConfirmationModal')).hide();
            
            // Navigate to view tickets section
            const viewTicketsLink = document.querySelector('.nav-link[data-section="view-tickets-section"]');
            viewTicketsLink.click();
        });
    }

    // Handle Cancel Ticket
    const cancelTicketBtns = document.querySelectorAll('.cancel-ticket');
    cancelTicketBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const ticketId = this.getAttribute('data-ticket-id');
            document.getElementById('cancelTicketId').textContent = ticketId;
        });
    });

    // Confirm Cancel Ticket
    const confirmCancelTicket = document.getElementById('confirmCancelTicket');
    if (confirmCancelTicket) {
        confirmCancelTicket.addEventListener('click', function() {
            const ticketId = document.getElementById('cancelTicketId').textContent;
            
            // Find the row with the ticket ID and update the action cell
            const ticketRows = document.querySelectorAll('#ticketsTable tbody tr');
            ticketRows.forEach(row => {
                const rowTicketId = row.querySelector('td:first-child').textContent;
                if (rowTicketId === ticketId) {
                    const actionCell = row.querySelector('td:last-child');
                    actionCell.innerHTML = '<span class="badge bg-secondary">Cancelled</span>';
                }
            });
            
            // Close the modal
            bootstrap.Modal.getInstance(document.getElementById('cancelTicketModal')).hide();
            
            // Show success message
            // alert(`Ticket ${ticketId} has been cancelled successfully.`);
        });
    }

    // Update Details Form Handling
    const updateDetailsForm = document.getElementById('updateDetailsForm');
    if (updateDetailsForm) {
        // Handle password update checkbox
        const updatePasswordCheckbox = document.getElementById('updatePassword');
        const passwordUpdateSection = document.getElementById('passwordUpdateSection');
        
        if (updatePasswordCheckbox && passwordUpdateSection) {
            updatePasswordCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    passwordUpdateSection.classList.remove('d-none');
                } else {
                    passwordUpdateSection.classList.add('d-none');
                }
            });
        }
        
        // Form submission
        updateDetailsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('updateEmail').value.trim();
            const mobile = document.getElementById('updateMobile').value.trim();
            const address = document.getElementById('updateAddress').value.trim();
            
            // Simple validation
            if (!email || !mobile || !address) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Check if password update is enabled
            if (updatePasswordCheckbox.checked) {
                const currentPassword = document.getElementById('currentPassword').value.trim();
                const newPassword = document.getElementById('newPassword').value.trim();
                const confirmNewPassword = document.getElementById('confirmNewPassword').value.trim();
                
                if (!currentPassword || !newPassword || !confirmNewPassword) {
                    alert('Please fill in all password fields');
                    return;
                }
                
                if (newPassword !== confirmNewPassword) {
                    alert('New password and confirm password do not match');
                    return;
                }
                
                // Password validation - same rules as registration
                const hasMinLength = newPassword.length >= 8;
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
                const hasNumber = /[0-9]/.test(newPassword);
                const hasUpperCase = /[A-Z]/.test(newPassword);
                
                if (!hasMinLength || !hasSpecialChar || !hasNumber || !hasUpperCase) {
                    let errorMsg = 'Password must:';
                    if (!hasMinLength) errorMsg += ' be at least 8 characters long,';
                    if (!hasSpecialChar) errorMsg += ' include at least 1 special character,';
                    if (!hasNumber) errorMsg += ' include at least 1 number,';
                    if (!hasUpperCase) errorMsg += ' include at least 1 uppercase letter,';
                    
                    // Remove trailing comma and add period
                    errorMsg = errorMsg.slice(0, -1) + '.';
                    
                    alert(errorMsg);
                    return;
                }
            }
            
            // Show success message
            alert('Your details have been updated successfully!');
            
            // Reset password fields if they were visible
            if (updatePasswordCheckbox.checked) {
                document.getElementById('currentPassword').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmNewPassword').value = '';
                updatePasswordCheckbox.checked = false;
                passwordUpdateSection.classList.add('d-none');
            }
        });
    }

    // Handle Show Past Tickets toggle
    const showPastTickets = document.getElementById('showPastTickets');
    if (showPastTickets) {
        showPastTickets.addEventListener('change', function() {
            // In a real application, this would filter the tickets based on date
            alert(this.checked ? 'Showing past journeys' : 'Showing upcoming journeys only');
        });
    }

    // Handle User Profile Modal
    const profileMenuLink = document.getElementById('profileMenuLink');
    if (profileMenuLink) {
        profileMenuLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, these would be retrieved from the backend or local storage
            document.getElementById('profileName').textContent = 'John Doe';
            document.getElementById('profileMobile').textContent = '9876543210';
            document.getElementById('profileEmail').textContent = 'johndoe@example.com';
            document.getElementById('profileAge').textContent = '32';
            
            // Show the profile modal
            const profileModal = new bootstrap.Modal(document.getElementById('userProfileModal'));
            profileModal.show();
        });
    }
    
    // Handle Edit Profile link in Profile Modal
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function(e) {
            // Close the modal first
            const profileModal = bootstrap.Modal.getInstance(document.getElementById('userProfileModal'));
            if (profileModal) {
                profileModal.hide();
            }
            
            // Navigate to update details section after a small delay to ensure modal is closed
            setTimeout(() => {
                // Hide all sections
                const sections = document.querySelectorAll('.dashboard-section');
                sections.forEach(section => {
                    section.classList.remove('active-section');
                });
                
                // Show the update details section
                document.getElementById('update-details-section').classList.add('active-section');
                
                // Update section title
                const sectionTitle = document.querySelector('.section-title');
                if (sectionTitle) {
                    sectionTitle.textContent = 'Update Details';
                }
                
                // Update active nav link
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                const updateDetailsLink = document.querySelector('.nav-link[data-section="update-details-section"]');
                if (updateDetailsLink) {
                    updateDetailsLink.classList.add('active');
                }
                
                // Scroll to the top of the update details section
                window.scrollTo(0, 0);
            }, 300);
        });
    }

    // Filter Trains Based on Selected Stations
    const boardingStation = document.getElementById('boardingStation');
    const destinationStation = document.getElementById('destinationStation');
    const availableTrains = document.getElementById('availableTrains');

    function updateAvailableTrains() {
        if (boardingStation && destinationStation && availableTrains) {
            const from = boardingStation.value;
            const to = destinationStation.value;
            
            if (from && to && from !== to) {
                // In a real application, this would fetch available trains based on selected stations
                // For this demo, we'll just reset and show all options
                availableTrains.querySelectorAll('option').forEach(option => {
                    if (option.value !== '') {
                        option.style.display = 'block';
                    }
                });
            }
        }
    }

    if (boardingStation) {
        boardingStation.addEventListener('change', updateAvailableTrains);
    }

    if (destinationStation) {
        destinationStation.addEventListener('change', updateAvailableTrains);
    }
}); 