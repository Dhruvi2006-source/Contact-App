const express = require('express');
const mongoose = require('mongoose');
const Contact = require('./Model/Contact');

const app = express();

// ------------------ DATABASE ------------------
mongoose
  .connect('mongodb://localhost:27017/contact_manager')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ DB connection failed:', err));

// ------------------ MIDDLEWARE ------------------
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ------------------ ROUTES ------------------

// 📄 All Contacts
app.get(['/','/contacts'], async (req, res) => {
  try {
    const contacts = await Contact.find().lean();
    res.render('contacts', { contacts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching contacts");
  }
});

// ➕ Add Contact (GET)
app.get('/contacts/add', (req, res) => {
  res.render('add_contact');
});

// ➕ Add Contact (POST)
app.post('/contacts/add', async (req, res) => {
  try {
    await Contact.create(req.body);
    res.redirect('/contacts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding contact');
  }
});

// ✏️ Edit Contact (GET)
app.get('/contacts/edit/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).lean();
    if (!contact) return res.status(404).send('Contact not found');
    res.render('update_contact', { contact });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading edit form');
  }
});

// ✏️ Edit Contact (POST)
app.post('/contacts/edit/:id', async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/contacts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating contact');
  }
});

// ❌ Delete Contact
app.get('/contacts/delete/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/contacts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting contact');
  }
});

// 👁️ View Single Contact (must come LAST)
app.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).lean();
    if (!contact) return res.status(404).send('Contact not found');
    res.render('show_contact', { contact });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving contact');
  }
});

// ------------------ SERVER ------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
