// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SupplyChain {
    // Enums to represent different stages of the supply chain
    enum Stages {
        Manufactured,
        InTransit,
        InWarehouse,
        Delivered
    }

    // Struct to represent a drug transfer event
    struct Transfer {
        address from;
        address to;
        Stages stage;
        uint timestamp;
    }

    // Struct to represent a drug
    struct Drug {
        uint id;
        string name;
        Stages stage;
        address owner;
        uint timestamp;
        Transfer[] transferHistory;
    }

    // Structs to hold information about each role
    struct Manufacturer {
        uint256 manufacturerId;
        string manufacturerCompany;
        string manufacturerLocation;
        address manufacturerEthAddress;
    }

    struct WholeSeller {
        uint256 wholeSellerId;
        string wholeSellerCompany;
        string wholeSellerLocation;
        address wholeSellerEthAddress;
    }

    struct Distributor {
        uint256 distributorId;
        string distributorCompany;
        string distributorLocation;
        address distributorEthAddress;
    }

    struct Pharmacy {
        uint256 pharmacyId;
        string pharmacyCompany;
        string pharmacyLocation;
        address pharmacyEthAddress;
    }

    struct Consumer {
        uint256 consumerId;
        string consumerName;
        address consumerEthAddress;
    }

    // Arrays to store participants in the supply chain
    Manufacturer[] public manufacturers;
    WholeSeller[] public wholeSellers;
    Distributor[] public distributors;
    Pharmacy[] public pharmacies;
    Consumer[] public consumers;

    // Mapping to store drugs
    mapping(uint => Drug) public drugs;
    uint[] public drugIds;

    // Events
    event ManufacturerAdded(
        uint256 manufacturerId,
        address manufacturerEthAddress
    );
    event WholeSellerAdded(
        uint256 wholeSellerId,
        address wholeSellerEthAddress
    );
    event DistributorAdded(
        uint256 distributorId,
        address distributorEthAddress
    );
    event PharmacyAdded(uint256 pharmacyId, address pharmacyEthAddress);
    event ConsumerAdded(uint256 consumerId, address consumerEthAddress);
    event DrugStageChanged(
        uint id,
        Stages stage,
        address owner,
        uint timestamp
    );

    // Modifiers
    modifier onlyManufacturer() {
        bool isManufacturer = false;
        for (uint i = 0; i < manufacturers.length; i++) {
            if (manufacturers[i].manufacturerEthAddress == msg.sender) {
                isManufacturer = true;
                break;
            }
        }
        require(isManufacturer, "Caller is not a registered manufacturer");
        _;
    }

    modifier onlyWholeSeller() {
        bool isWholeSeller = false;
        for (uint i = 0; i < wholeSellers.length; i++) {
            if (wholeSellers[i].wholeSellerEthAddress == msg.sender) {
                isWholeSeller = true;
                break;
            }
        }
        require(isWholeSeller, "Caller is not a registered wholeseller");
        _;
    }

    modifier onlyDistributor() {
        bool isDistributor = false;
        for (uint i = 0; i < distributors.length; i++) {
            if (distributors[i].distributorEthAddress == msg.sender) {
                isDistributor = true;
                break;
            }
        }
        require(isDistributor, "Caller is not a registered distributor");
        _;
    }

    modifier onlyPharmacy() {
        bool isPharmacy = false;
        for (uint i = 0; i < pharmacies.length; i++) {
            if (pharmacies[i].pharmacyEthAddress == msg.sender) {
                isPharmacy = true;
                break;
            }
        }
        require(isPharmacy, "Caller is not a registered pharmacy");
        _;
    }

    modifier onlyConsumer() {
        bool isConsumer = false;
        for (uint i = 0; i < consumers.length; i++) {
            if (consumers[i].consumerEthAddress == msg.sender) {
                isConsumer = true;
                break;
            }
        }
        require(isConsumer, "Caller is not a registered consumer");
        _;
    }

    // Functions to add participants
    function addManufacturer(
        uint256 _manufacturerId,
        string memory _manufacturerCompany,
        string memory _manufacturerLocation,
        address _manufacturerEthAddress
    ) public {
        manufacturers.push(
            Manufacturer(
                _manufacturerId,
                _manufacturerCompany,
                _manufacturerLocation,
                _manufacturerEthAddress
            )
        );
        emit ManufacturerAdded(_manufacturerId, _manufacturerEthAddress);
    }

    function addWholeSeller(
        uint256 _wholeSellerId,
        string memory _wholeSellerCompany,
        string memory _wholeSellerLocation,
        address _wholeSellerEthAddress
    ) public {
        wholeSellers.push(
            WholeSeller(
                _wholeSellerId,
                _wholeSellerCompany,
                _wholeSellerLocation,
                _wholeSellerEthAddress
            )
        );
        emit WholeSellerAdded(_wholeSellerId, _wholeSellerEthAddress);
    }

    function addDistributor(
        uint256 _distributorId,
        string memory _distributorCompany,
        string memory _distributorLocation,
        address _distributorEthAddress
    ) public {
        distributors.push(
            Distributor(
                _distributorId,
                _distributorCompany,
                _distributorLocation,
                _distributorEthAddress
            )
        );
        emit DistributorAdded(_distributorId, _distributorEthAddress);
    }

    function addPharmacy(
        uint256 _pharmacyId,
        string memory _pharmacyCompany,
        string memory _pharmacyLocation,
        address _pharmacyEthAddress
    ) public {
        pharmacies.push(
            Pharmacy(
                _pharmacyId,
                _pharmacyCompany,
                _pharmacyLocation,
                _pharmacyEthAddress
            )
        );
        emit PharmacyAdded(_pharmacyId, _pharmacyEthAddress);
    }

    function addConsumer(
        uint256 _consumerId,
        string memory _consumerName,
        address _consumerEthAddress
    ) public {
        consumers.push(
            Consumer(_consumerId, _consumerName, _consumerEthAddress)
        );
        emit ConsumerAdded(_consumerId, _consumerEthAddress);
    }

    // Functions to manage drugs
    function addDrug(uint _id, string memory _name) public onlyManufacturer {
        require(drugs[_id].id == 0, "Drug already exists");

        Drug storage newDrug = drugs[_id];
        newDrug.id = _id;
        newDrug.name = _name;
        newDrug.stage = Stages.Manufactured;
        newDrug.owner = msg.sender;
        newDrug.timestamp = block.timestamp;

        drugIds.push(_id);

        newDrug.transferHistory.push(
            Transfer({
                from: address(0),
                to: msg.sender,
                stage: Stages.Manufactured,
                timestamp: block.timestamp
            })
        );

        emit DrugStageChanged(
            _id,
            Stages.Manufactured,
            msg.sender,
            block.timestamp
        );
    }

    function purchaseDrug(uint _id) public onlyWholeSeller {
        require(drugs[_id].id != 0, "Drug does not exist");
        require(
            drugs[_id].stage == Stages.Manufactured,
            "Drug is not in the Manufactured stage"
        );

        drugs[_id].transferHistory.push(
            Transfer({
                from: drugs[_id].owner,
                to: msg.sender,
                stage: Stages.InTransit,
                timestamp: block.timestamp
            })
        );

        drugs[_id].owner = msg.sender;
        drugs[_id].stage = Stages.InTransit;
        drugs[_id].timestamp = block.timestamp;

        emit DrugStageChanged(
            _id,
            Stages.InTransit,
            msg.sender,
            block.timestamp
        );
    }

    function shipDrug(uint _id) public onlyWholeSeller {
        require(drugs[_id].id != 0, "Drug does not exist");
        require(
            drugs[_id].stage == Stages.InTransit,
            "Drug is not in the InTransit stage"
        );
        require(
            drugs[_id].owner == msg.sender,
            "Only the current owner can ship the drug"
        );

        drugs[_id].transferHistory.push(
            Transfer({
                from: msg.sender,
                to: msg.sender, // Ownership doesn't change here, but stage does
                stage: Stages.InWarehouse,
                timestamp: block.timestamp
            })
        );

        drugs[_id].stage = Stages.InWarehouse;
        drugs[_id].timestamp = block.timestamp;

        emit DrugStageChanged(
            _id,
            Stages.InWarehouse,
            msg.sender,
            block.timestamp
        );
    }

    function receiveDrug(uint _id) public onlyDistributor {
        require(drugs[_id].id != 0, "Drug does not exist");
        require(
            drugs[_id].stage == Stages.InWarehouse,
            "Drug is not in the InWarehouse stage"
        );
        require(
            drugs[_id].owner == msg.sender,
            "Only the current owner can receive the drug"
        );

        drugs[_id].transferHistory.push(
            Transfer({
                from: msg.sender,
                to: msg.sender, // Ownership doesn't change here, but stage does
                stage: Stages.Delivered,
                timestamp: block.timestamp
            })
        );

        drugs[_id].stage = Stages.Delivered;
        drugs[_id].timestamp = block.timestamp;

        emit DrugStageChanged(
            _id,
            Stages.Delivered,
            msg.sender,
            block.timestamp
        );
    }

    function getDrugStatus(
        uint _id
    ) public view returns (Stages, address, uint) {
        require(drugs[_id].id != 0, "Drug does not exist");

        Drug memory d = drugs[_id];
        return (d.stage, d.owner, d.timestamp);
    }

    function traceDrug(uint _id) public view returns (Transfer[] memory) {
        require(drugs[_id].id != 0, "Drug does not exist");

        return drugs[_id].transferHistory;
    }

    function getDrugDetails(
        uint _id
    ) public view returns (uint, string memory, Stages, address, uint) {
        require(drugs[_id].id != 0, "Drug does not exist");

        Drug memory d = drugs[_id];
        return (d.id, d.name, d.stage, d.owner, d.timestamp);
    }
}
