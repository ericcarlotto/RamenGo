import { getBroths, getProteins, postOrder } from './services/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const brothsContainer = document.querySelector('.brothsCards'); 
  const proteinsContainer = document.querySelector('.proteinsCards'); 
  const orderButton = document.getElementById('place-order-button');

  let selectedBrothCard = null;
  let selectedProteinCard = null;
  let selectedBrothId = null;
  let selectedProteinId = null;

  const renderBroths = (broths) => {
    brothsContainer.innerHTML = '';

    broths.forEach((broth) => {
      const card = createBrothCard(broth);
      brothsContainer.appendChild(card);
    });
  };

  const renderProteins = (proteins) => {
    proteinsContainer.innerHTML = '';

    proteins.forEach((protein) => {
      const card = createProteinCard(protein);
      proteinsContainer.appendChild(card);
    });
  };

  const createBrothCard = (broth) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = broth.imageInactive; 
    img.alt = broth.name; 
    card.appendChild(img);

    const h3 = document.createElement('h3');
    h3.textContent = broth.name; 
    card.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = broth.description; 
    card.appendChild(p);

    const span = document.createElement('span');
    span.textContent = `US$ ${broth.price}`;
    card.appendChild(span);

    card.addEventListener('click', () => {
      if (selectedBrothCard && selectedBrothCard !== card) {
        deselectCard(selectedBrothCard);
      }
      if (selectedBrothCard !== card) {
        selectCard(card, broth.imageActive);
        selectedBrothCard = card;
        selectedBrothId = broth.id;
      } else {
        deselectCard(card);
        selectedBrothCard = null;
        selectedBrothId = null;
      }
      updateOrderButtonState();
    });

    return card;
  };

  const createProteinCard = (protein) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = protein.imageInactive; 
    img.alt = protein.name; 
    card.appendChild(img);

    const h3 = document.createElement('h3');
    h3.textContent = protein.name; 
    card.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = protein.description; 
    card.appendChild(p);

    const span = document.createElement('span');
    span.textContent = `US$ ${protein.price}`; 
    card.appendChild(span);

    card.addEventListener('click', () => {
      if (selectedProteinCard && selectedProteinCard !== card) {
        deselectCard(selectedProteinCard);
      }
      if (selectedProteinCard !== card) {
        selectCard(card, protein.imageActive);
        selectedProteinCard = card;
        selectedProteinId = protein.id;
      } else {
        deselectCard(card);
        selectedProteinCard = null;
        selectedProteinId = null;
      }
      updateOrderButtonState();
    });

    return card;
  };

  const selectCard = (card, activeImage) => {
    card.classList.add('selected');
    const img = card.querySelector('img');
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    const span = card.querySelector('span');
    img.src = activeImage;
    h3.style.color = 'white';
    p.style.color = 'white';
    span.style.color = 'yellow';
  };

  const deselectCard = (card) => {
    card.classList.remove('selected');
    const img = card.querySelector('img');
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    const span = card.querySelector('span');
    img.src = img.src.replace('active', 'inactive');
    h3.style.color = 'blue';
    p.style.color = 'black';
    span.style.color = 'red';
  };

  const updateOrderButtonState = () => {
    if (selectedBrothId && selectedProteinId) {
      orderButton.disabled = false;
      orderButton.style.cursor = 'pointer';
      document.querySelector('.order-arrow-icon').src = 'src/assets/FlechaDireita.svg';
    } else {
      orderButton.disabled = true;
      orderButton.style.cursor = 'auto';
      document.querySelector('.order-arrow-icon').src = 'src/assets/FlechaDireitaDesativada.svg';
    }
  };

  const fetchBroths = async () => {
    try {
      const broths = await getBroths();
      console.log('Broths:', broths);
      renderBroths(broths);
    } catch (error) {
      console.error(error);
      document.querySelector('.broths .error-card').classList.remove('hidden');
    }
  };

  const fetchProteins = async () => {
    try {
      const proteins = await getProteins();
      console.log('Proteins:', proteins);
      renderProteins(proteins);
    } catch (error) {
      console.error(error);
      document.querySelector('.proteins .error-card').classList.remove('hidden');
    }
  };

  orderButton.addEventListener('click', () => {
    console.log('Selected Broth ID:', selectedBrothId);
    console.log('Selected Protein ID:', selectedProteinId);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var orderDetails = "Your order details here...";

    document.querySelector('.order-details').textContent = orderDetails;

    document.getElementById('place-new-order').addEventListener('click', function() {
        window.location.href = 'pagina_principal.html'; 
    });
  });

  orderButton.addEventListener('click', async () => {
    try {
      const response = await postOrder(selectedBrothId, selectedProteinId);
  
      sessionStorage.setItem('orderConfirmation', JSON.stringify(response));
  
      window.location.href = 'orderConfirmation.html';
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  });
  

  await fetchBroths();
  await fetchProteins();
});

document.addEventListener('DOMContentLoaded', () => {
  const orderConfirmationData = JSON.parse(sessionStorage.getItem('orderConfirmation'));

  if (orderConfirmationData) {
    const orderDetails = document.querySelector('.order-details');
    if (orderDetails) {
      orderDetails.textContent = orderConfirmationData.description;
    }

    const confirmationImage = document.querySelector('.confirmation-image');
    if (confirmationImage) {
      confirmationImage.src = orderConfirmationData.image;
      confirmationImage.alt = orderConfirmationData.description;
    }

    localStorage.removeItem('orderConfirmation');
  }
});