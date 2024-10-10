import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Link, Image } from '@react-pdf/renderer';
import CairoRegular from '../fonts/Cairo-Regular.ttf';
import CairoBold from '../fonts/Cairo-Bold.ttf';
import './VendorDetail.css';
import logo from '../group-17.png';

// تسجيل الخطوط
Font.register({
    family: 'Cairo',
    fonts: [
        { src: CairoRegular, fontWeight: 'normal' },
        { src: CairoBold, fontWeight: 'bold' },
    ],
});

// أنماط PDF
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

    const VendorDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ textAlign: 'center' }}>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.subHeader}>Supplier Registration</Text>
                </View>
                {vendor.vendorName && (
                    <View style={styles.container}>
                        <Text style={styles.label}>Registered Company Name:</Text>
                        <Text style={styles.content}>{vendor.vendorName}</Text>
                    </View>
                )}
                {vendor.subcontractor && (
                    <View style={styles.container}>
                        <Text style={styles.label}>Subcontractor/Supplier:</Text>
                        <Text style={styles.content}>{vendor.subcontractor}</Text>
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
                {vendor.proposedProject && (
                    <View style={styles.container}>
                        <Text style={styles.label}>Proposed/Assigned Project:</Text>
                        <Text style={styles.content}>{vendor.proposedProject}</Text>
                    </View>
                )}
                {vendor.commercialRegistration && (
                    <View style={styles.container}>
                        <Text style={styles.label}>Commercial Registration No:</Text>
                        <Text style={styles.content}>{vendor.commercialRegistration}</Text>
                    </View>
                )}
                {vendor.taxCard && (
                    <View style={styles.container}>
                        <Text style={styles.label}>Tax Card No:</Text>
                        <Text style={styles.content}>{vendor.taxCard}</Text>
                    </View>
                )}
                {vendor.federation && (
                    <View style={styles.container}>
                        <Text style={styles.label}>Federation Registration:</Text>
                        <Text style={styles.content}>{vendor.federation}</Text>
                    </View>
                )} 
                {vendor.classification && (
                    <View style={styles.container}>
                        <Text style={styles.label}>Classification:</Text>
                        <Text style={styles.content}>{vendor.classification}</Text>
                    </View>
                )}
                {vendor.vat && (
                    <View style={styles.container}>
                        <Text style={styles.label}>VAT Registration:</Text>
                        <Text style={styles.content}>{vendor.vat}</Text>
                    </View>
                )}
                {vendor.prequalification && (
                    <View style={styles.container}>
                        <Text style={styles.label}>Prequalification:</Text>
                        <Text style={styles.content}>{vendor.prequalification}</Text>
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
                {vendor.prequalificationDocument && (
                    <View style={styles.container}>
                        <Text style={styles.label}>Prequalification Document:</Text>
                        <Link style={styles.link} src={vendor.prequalificationDocument}>
                            {vendor.prequalificationDocument}
                        </Link>
                    </View>
                )}
                {vendor.taxCardDoc && (
                    <View style={styles.container}>
                        <Text style={styles.label}>Tax Card Document:</Text>
                        <Link style={styles.link} src={vendor.taxCardDoc}>
                            {vendor.taxCardDoc}
                        </Link>
                    </View>
                )}
                {vendor.federationRegistration && (
                    <View style={styles.container}>
                        <Text style={styles.label}>Federation Registration Document:</Text>
                        <Link style={styles.link} src={vendor.federationRegistration}>
                            {vendor.federationRegistration}
                        </Link>
                    </View>
                )}
                {vendor.vatRegistrationDoc && (
                    <View style={styles.container}>
                        <Text style={styles.label}>VAT Registration Document:</Text>
                        <Link style={styles.link} src={vendor.vatRegistrationDoc}>
                            {vendor.vatRegistrationDoc}
                        </Link>
                    </View>
                )}
                {vendor.bankLetter && (
                    <View style={styles.container}>
                        <Text style={styles.label}>Bank Letter:</Text>
                        <Link style={styles.link} src={vendor.bankLetter}>
                            {vendor.bankLetter}
                        </Link>
                    </View>
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
                {vendor.vendorName && <p><strong>Registered Company Name:</strong> {vendor.vendorName}</p>}
                {vendor.subcontractor && <p><strong>Subcontractor/Supplier:</strong> {vendor.subcontractor}</p>}
                {vendor.companyWebsite && <p><strong>Company Website:</strong> <a href={vendor.companyWebsite}>{vendor.companyWebsite}</a></p>}
                {vendor.contactPerson && <p><strong>Contact Person:</strong> {vendor.contactPerson}</p>}
                {vendor.nationalId && <p><strong>National ID No:</strong> {vendor.nationalId}</p>}
                {vendor.contactMobile && <p><strong>Contact Mobile Number:</strong> {vendor.contactMobile}</p>}
                {vendor.email && <p><strong>Email:</strong> {vendor.email}</p>}
                {vendor.scopeOfWork && <p><strong>Scope of Work:</strong> {vendor.scopeOfWork}</p>}
                {vendor.preferredPaymentMethod && <p><strong>Preferred Payment Method:</strong> {vendor.preferredPaymentMethod}</p>}
                {vendor.bankAccount && <p><strong>Bank Account No:</strong> {vendor.bankAccount}</p>}
                {vendor.swiftCode && <p><strong>Swift Code:</strong> {vendor.swiftCode}</p>}
                {vendor.proposedProject && <p><strong>Proposed/Assigned Project:</strong> {vendor.proposedProject}</p>}
                {vendor.commercialRegistration && <p><strong>Commercial Registration No:</strong> {vendor.commercialRegistration}</p>}
                {vendor.taxCard && <p><strong>Tax Card No:</strong> {vendor.taxCard}</p>}
                {vendor.federation && <p><strong>Federation Registration:</strong> {vendor.federation}</p>}
                {vendor.classification && <p><strong>Classification:</strong> {vendor.classification}</p>}
                {vendor.vat && <p><strong>VAT Registration:</strong> {vendor.vat}</p>}
                {vendor.prequalification && <p><strong>Prequalification:</strong> {vendor.prequalification}</p>}
                {vendor.remarks && <p><strong>Remarks:</strong> {vendor.remarks}</p>}
                {vendor.companyProfile && <p><strong>Company Profile:</strong> <a href={vendor.companyProfile}>{vendor.companyProfile}</a></p>}
                {vendor.prequalificationDocument && <p><strong>Prequalification Document:</strong> <a href={vendor.prequalificationDocument}>{vendor.prequalificationDocument}</a></p>}
                {vendor.taxCardDoc && <p><strong>Tax Card Document:</strong> <a href={vendor.taxCardDoc}>{vendor.taxCardDoc}</a></p>}
                {vendor.federationRegistration && <p><strong>Federation Registration Document:</strong> <a href={vendor.federationRegistration}>{vendor.federationRegistration}</a></p>}
                {vendor.vatRegistrationDoc && <p><strong>VAT Registration Document:</strong> <a href={vendor.vatRegistrationDoc}>{vendor.vatRegistrationDoc}</a></p>}
                {vendor.bankLetter && <p><strong>Bank Letter:</strong> <a href={vendor.bankLetter}>{vendor.bankLetter}</a></p>}
            </div>
            <PDFDownloadLink document={<VendorDocument />} fileName={`vendor_${id}.pdf`}>
                {({ loading }) => (loading ? 'Loading document...' : 'Download Vendor Document')}
            </PDFDownloadLink>
        </div>
    );
};

export default VendorDetail;
