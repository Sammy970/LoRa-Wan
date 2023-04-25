import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import $ from 'jquery';

const Input = () => {

    const [formValue, setFormValue] = useState({
        countryName: '',
    })

    const [compareValue, setCompareValue] = useState({
        value: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue({
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formValue);
        compareData();
    }

    function compareData() {
        fetch('http://localhost:5000/api/fetch')
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                const countries = data.map((item) => item.country);

                if (countries.includes(formValue.countryName) == true) {
                    var isThere = 'true'
                } else {
                    var isThere = 'false'
                }

                if (isThere == 'true') {
                    $('#result').empty();
                    const countryData = data.find(data1 => data1.country == formValue.countryName);
                    // console.log(countryData);
                    $('#result').append(
                        `<br/><p><strong>Country Selected:</strong> ${countryData.country}</p>`,
                        `<br/><p><strong>Frequency Plan:</strong> ${countryData.frequencyPlan}</p>`,
                        `<br/><p><strong>Regulatory Documents:</strong> ${countryData.regulatoryDocument}</p>`
                    )

                } else {
                    $('#result').empty();
                    $('#result').append(
                        alert('The country you have entered is not included in the official list')
                    );
                }
            })
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Country Name</Form.Label>
                    <Form.Control type="text" placeholder='Country Name' name="countryName" onChange={handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit" >Submit</Button>
            </Form>

            <div id='result'></div>
        </>
    )
}

export default Input