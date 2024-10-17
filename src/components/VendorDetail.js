import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Link, Image } from '@react-pdf/renderer';
import CairoRegular from '../fonts/Cairo-Regular.ttf';
import CairoBold from '../fonts/Cairo-Bold.ttf';
import './VendorDetail.css';
import logo from '../group-17.png';

// Register fonts
Font.register({
    family: 'Cairo',
    fonts: [
        { src: CairoRegular, fontWeight: 'normal' },
        { src: CairoBold, fontWeight: 'bold' },
    ],
});

// PDF styles
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
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#1E5D87',
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
                if (data) {
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

    const VendorDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ textAlign: 'center' }}>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.subHeader}>Supplier Registration</Text>
                </View>
                {vendor && (
                    <>
                        {vendor.registeredCompanyName && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Registered Company Name:</Text>
                                <Text style={styles.content}>{vendor.registeredCompanyName}</Text>
                            </View>
                        )}
                        {vendor.subcontractorSupplier && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Subcontractor/Supplier:</Text>
                                <Text style={styles.content}>{vendor.subcontractorSupplier}</Text>
                            </View>
                        )}
                        {vendor.companyWebsite && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Company Website:</Text>
                                <Link style={styles.link} src={vendor.companyWebsite}>
                                    {vendor.companyWebsite}
                                </Link>
                            </View>
                        )}
                        {vendor.contactPerson && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Contact Person:</Text>
                                <Text style={styles.content}>{vendor.contactPerson}</Text>
                            </View>
                        )}
                        {vendor.nationalId && (
                            <View style={styles.container}>
                                <Text style={styles.label}>National ID No:</Text>
                                <Text style={styles.content}>{vendor.nationalId}</Text>
                            </View>
                        )}
                        {vendor.contactMobile && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Contact Mobile Number:</Text>
                                <Text style={styles.content}>{vendor.contactMobile}</Text>
                            </View>
                        )}
                        {vendor.email && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Email:</Text>
                                <Text style={styles.content}>{vendor.email}</Text>
                            </View>
                        )}
                        {vendor.scopeOfWork && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Scope of Work:</Text>
                                <Text style={styles.content}>{vendor.scopeOfWork}</Text>
                            </View>
                        )}
                        {vendor.preferredPaymentMethod && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Preferred Payment Method:</Text>
                                <Text style={styles.content}>{vendor.preferredPaymentMethod}</Text>
                            </View>
                        )}
                        {vendor.bankAccount && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Bank Account No:</Text>
                                <Text style={styles.content}>{vendor.bankAccount}</Text>
                            </View>
                        )}
                        {vendor.swiftCode && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Swift Code:</Text>
                                <Text style={styles.content}>{vendor.swiftCode}</Text>
                            </View>
                        )}
                        {vendor.proposedAssignedProject && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Proposed/Assigned Project:</Text>
                                <Text style={styles.content}>{vendor.proposedAssignedProject}</Text>
                            </View>
                        )}
                        {vendor.commercialRegistrationNo && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Commercial Registration No:</Text>
                                <Text style={styles.content}>{vendor.commercialRegistrationNo}</Text>
                            </View>
                        )}
                        {vendor.taxCardNo && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Tax Card No:</Text>
                                <Text style={styles.content}>{vendor.taxCardNo}</Text>
                            </View>
                        )}
                        {vendor.federationRegistration && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Federation Registration:</Text>
                                <Text style={styles.content}>{vendor.federationRegistration}</Text>
                            </View>
                        )}
                        {vendor.classification && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Classification:</Text>
                                <Text style={styles.content}>{vendor.classification}</Text>
                            </View>
                        )}
                        {vendor.vatRegistration && (
                            <View style={styles.container}>
                                <Text style={styles.label}>VAT Registration:</Text>
                                <Text style={styles.content}>{vendor.vatRegistration}</Text>
                            </View>
                        )}
                        {vendor.prequalificationDocument && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Prequalification Document:</Text>
                                <Link style={styles.link} src={vendor.prequalificationDocument}>
                                    {vendor.prequalificationDocument}
                                </Link>
                            </View>
                        )}
                        {vendor.remarks && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Remarks:</Text>
                                <Text style={styles.content}>{vendor.remarks}</Text>
                            </View>
                        )}
                        {vendor.companyProfile && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Company Profile:</Text>
                                <Link style={styles.link} src={vendor.companyProfile}>
                                    {vendor.companyProfile}
                                </Link>
                            </View>
                        )}
                        {vendor.taxCard && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Tax Card Document:</Text>
                                <Link style={styles.link} src={vendor.taxCard}>
                                    {vendor.taxCard}
                                </Link>
                            </View>
                        )}
                        {vendor.federationRegistrationAdditional && (
                            <View style={styles.container}>
                                <Text style={styles.label}>Federation Registration Document:</Text>
                                <Link style={styles.link} src={vendor.federationRegistrationAdditional}>
                                    {vendor.federationRegistrationAdditional}
                                </Link>
                            </View>
                        )}
                        {vendor.vatRegistrationAdditional && (
                            <View style={styles.container}>
                                <Text style={styles.label}>VAT Registration Document:</Text>
                                <Link style={styles.link} src={vendor.vatRegistrationAdditional}>
                                    {vendor.vatRegistrationAdditional}
                                </Link>
                            </View>
                        )}
                    </>
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
            <h1>Vendor Detail</h1>
            {vendor ? (
                <PDFDownloadLink document={<VendorDocument />} fileName={`${vendor.registeredCompanyName || 'vendor'}.pdf`}>
                    {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
                </PDFDownloadLink>
            ) : (
                <p>No vendor data found.</p>
            )}
        </div>
    );
};

export default VendorDetail;
