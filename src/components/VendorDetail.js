// Import necessary modules
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Link, Image } from '@react-pdf/renderer';
import CairoRegular from '../fonts/Cairo-Regular.ttf';
import CairoBold from '../fonts/Cairo-Bold.ttf';
import './VendorDetail.css';
import logo from '../group-17.png';

// Register the fonts for PDF
Font.register({
    family: 'Cairo',
    fonts: [
        { src: CairoRegular, fontWeight: 'normal' },
        { src: CairoBold, fontWeight: 'bold' },
    ],
});

// تعديل تنسيق الروابط والنصوص لتكون الروابط تحت النص
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Cairo',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 80,
        marginVertical: 10,
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    container: {
        marginBottom: 15,
        padding: 10,
        borderBottom: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    label: {
        fontWeight: 'bold',
        color: '#1E5D87',
        marginBottom: 5,
    },
    content: {
        fontSize: 12,
        color: '#555',
        marginBottom: 5,
    },
    link: {
        color: '#1E5D87',
        textDecoration: 'underline',
        marginTop: 5,
    },
});

// Firebase URL
const firebaseUrl = 'https://procurement-edecs-default-rtdb.firebaseio.com/';

const VendorDetail = () => {
    const { id } = useParams();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await fetch(`${firebaseUrl}/vendors/${id}/vendorInfo.json`);
                if (!response.ok) {
                    throw new Error('Failed to load data: ' + response.statusText);
                }
                const data = await response.json();
                if (data && Object.keys(data).length > 0) {
                    setVendor(data);
                } else {
                    setError("No vendor data found.");
                }
            } catch (error) {
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchVendorData();
    }, [id]);

    // Updated ordered fields to include all necessary fields with correct names
    const orderedFields = [
        'timestamp',
        'serviceProviderName',
        'serviceType',
        'contactPerson',
        'nationalIdNo', // Correct name for National ID
        'contactMobile',
        'email',
        'scopeOfWork',
        'preferredPaymentMethod',
        'shortDescription', 
        'description',
        'remarks',
        'nationalIdCopy', // Correct field for National ID Copy
        'bankLetterIncludingSwift',
        'registeredCompanyName',
        'subcontractorSupplier',
        'companyWebsite',
        'proposedAssignedProject',
        'commercialRegistrationNo',
        'taxCardNo',
        'federationForConstruction',
        'classification',
        'vatRegistration',
        'bankAccountNo',
        'swiftCode',
        'companyProfile',
        'prequalificationDocument',
        'commercialRegistration',
        'taxCard',
        'federationRegistration',
        'officialBankLetter'
    ];

    // Helper function to format labels
    const formatLabel = (key) => {
        const formattedLabel = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        return formattedLabel.split('_').join(' ');
    };

    const VendorDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ textAlign: 'center' }}>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.subHeader}>Supplier Registration</Text>
                </View>
                {orderedFields.map((key) =>
                    vendor[key] ? (
                        <View style={styles.container} key={key}>
                            <Text style={styles.label}>{formatLabel(key)}:</Text>
                            {key.includes('Link') || key.includes('Copy') ? (
                                <Link style={styles.link} src={vendor[key]}>{vendor[key]}</Link>
                            ) : (
                                <Text style={styles.content}>{vendor[key]}</Text>
                            )}
                        </View>
                    ) : null // Do not render anything if there is no data
                )}
            </Page>
        </Document>
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="vendor-detail">
            <h1>Vendor Details</h1>
            <div>
                {orderedFields.map((key) =>
                    vendor[key] ? (
                        <p key={key}>
                            <strong>{formatLabel(key)}:</strong> {key.includes('Link') || key.includes('Copy') ? (
                                <a href={vendor[key]} target="_blank" rel="noopener noreferrer">{vendor[key]}</a>
                            ) : (
                                vendor[key]
                            )}
                        </p>
                    ) : null // Do not render anything if there is no data
                )}
            </div>
            <PDFDownloadLink document={<VendorDocument />} fileName={`vendor_${id}.pdf`}>
                {({ loading }) => (loading ? 'Loading document...' : 'Download Vendor Document')}
            </PDFDownloadLink>
        </div>
    );
};

export default VendorDetail;
