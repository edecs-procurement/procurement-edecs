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

// Define PDF styles
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontWeight: 'bold',
        color: '#1E5D87',
    },
    content: {
        fontSize: 12,
        color: '#555',
        marginBottom: 5,
    },
    link: {
        color: '#1E5D87',
        textDecoration: 'underline',
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

    // PDF document generation
    const VendorDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ textAlign: 'center' }}>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.subHeader}>Supplier Registration</Text>
                </View>
                {Object.entries(vendor).map(([key, value]) =>
                    value ? (
                        <View style={styles.container} key={key}>
                            <Text style={styles.label}>{formatLabel(key)}:</Text>
                            {key.includes('Link') || key.includes('Copy') ? (
                                <Link style={styles.link} src={value}>{value}</Link>
                            ) : (
                                <Text style={styles.content}>{value}</Text>
                            )}
                        </View>
                    ) : null
                )}
            </Page>
        </Document>
    );

    // Helper function to format labels
    const formatLabel = (key) => {
        const formattedLabel = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        return formattedLabel.split('_').join(' ');
    };

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
                {Object.entries(vendor).map(([key, value]) =>
                    value ? (
                        <p key={key}>
                            <strong>{formatLabel(key)}:</strong> {key.includes('Link') || key.includes('Copy') ? (
                                <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
                            ) : (
                                value
                            )}
                        </p>
                    ) : null
                )}
            </div>
            <PDFDownloadLink document={<VendorDocument />} fileName={`vendor_${id}.pdf`}>
                {({ loading }) => (loading ? 'Loading document...' : 'Download Vendor Document')}
            </PDFDownloadLink>
        </div>
    );
};

export default VendorDetail;
